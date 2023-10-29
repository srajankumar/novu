"use client";
// import { Metadata } from "next";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";

interface DriverInfo {
  _id: string;
  name: string;
  phone: string;
  imageUrl: string;
  busID: string;
  routeID: string;
  // Add other properties as needed
}

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
  // Add other properties as needed
}

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
import ThemeToggle from "@/components/ThemeToggle";
import AuthButton from "@/components/dashboard/AuthButton";

import AddDriver from "@/components/dashboard/AddDriver";
import DisplayDriver from "@/components/dashboard/DisplayDriver";
import DisplayVehicle from "@/components/dashboard/DisplayVehicle";
import AddVehicle from "@/components/dashboard/AddVehicle";

export default function DashboardPage() {
  const [driverInformation, setDriverInformation] = useState<DriverInfo[]>([]);
  const [vehicleInformation, setVehicleInformation] = useState<VehicleInfo[]>(
    []
  );

  useEffect(() => {
    const fetchDriverInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/driver/info");
        setDriverInformation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchVehicleInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vehicle/info"); // Adjust the URL
        setVehicleInformation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDriverInfo();
    fetchVehicleInfo();
  }, []);

  const driversWithEmptyBusID = driverInformation.filter(
    (driver) => !driver.busID
  );

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <AuthButton />
              <ThemeToggle />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="adddrivers">Add Drivers</TabsTrigger>
              <TabsTrigger value="drivers">Drivers</TabsTrigger>
              <TabsTrigger value="addvehicles">Add Vehicles</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="map" disabled>
                Map
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Drivers
                    </CardTitle>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {driverInformation.length}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Vehicles
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {" "}
                      {vehicleInformation.length}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Drivers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {driversWithEmptyBusID.length}
                    </div>
                    {/* <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Fuel Prices</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Active Drivers</CardTitle>
                    <CardDescription>Driver information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="adddrivers" className="space-y-4">
              <AddDriver />
            </TabsContent>
            <TabsContent value="drivers" className="space-y-4">
              <DisplayDriver />
            </TabsContent>
            <TabsContent value="addvehicles" className="space-y-4">
              <AddVehicle />
            </TabsContent>
            <TabsContent value="vehicles" className="space-y-4">
              <DisplayVehicle />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
