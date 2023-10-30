"use client";
import { Metadata } from "next";
import Image from "next/image";

import { useCookies } from "react-cookie";

import { Button } from "@/components/ui//button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui//tabs";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";

import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

import Schedule from "@/components/driver/Schedule";
import Vehicle from "@/components/driver/Vehicle";

import Map from "@/components/driver/Map";

import ThemeToggle from "@/components/ThemeToggle";
import DriverAuthButton from "@/components/ui/DriverAuthButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { SavedInfo } from "@/components/driver/Profile";

export default function DashboardPage() {
  const [cookies] = useCookies(["username"]);
  const loginName = cookies.username;
  return (
    <>
      <div className="md:hidden flex w-full h-screen justify-center items-center text-3xl font-bold">
        <h1>Not Supported</h1>
      </div>
      <div className="hidden flex-col md:flex">
        {/* <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div> */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <ThemeToggle />
              <DriverAuthButton />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SavedInfo userName={loginName} />
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Your Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Schedule userName={loginName} />
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Vehicle userName={loginName} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="map" className="space-y-4">
              <Map userName={loginName} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
