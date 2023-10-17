// import Image from "next/image";
// import ThemeToggle from "@/components/ThemeToggle";

// export default function Home() {
//   return (
//     <main>
//       <ThemeToggle />
//     </main>
//   );
// }
import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { MainNav } from "@/components/dashboard/main-nav";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { Search } from "@/components/dashboard/search";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import ModeToggle from "@/components/ThemeToggle";

import { Package } from "lucide-react";

import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="flex h-screen">
        <div className="md:flex flex-col hidden h-full w-1/5 bg-background bg-opacity-100">
          <div className="h-fit flex items-center space-x-4 text-2xl mx-10 mt-12 mb-8 font-bold">
            <Package /> <p>Novu</p>
          </div>
          <ul className="">
            <li className="ml-5 my-5 rounded-l-2xl hover:bg-muted text-base font-medium px-5 py-3">
              Dashboard
            </li>
            <li className="ml-5 my-5 rounded-l-2xl bg-muted text-base font-medium px-5 py-3">
              Schedule
            </li>
            <li className="ml-5 my-5 rounded-l-2xl hover:bg-muted text-base font-medium px-5 py-3">
              Vehicles
            </li>
            <li className="ml-5 my-5 rounded-l-2xl hover:bg-muted text-base font-medium px-5 py-3">
              Drivers
            </li>
            <li className="ml-5 my-5 rounded-l-2xl hover:bg-muted text-base font-medium px-5 py-3">
              Map
            </li>
          </ul>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <UserNav />
            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
      </div>
    </>
  );
}
