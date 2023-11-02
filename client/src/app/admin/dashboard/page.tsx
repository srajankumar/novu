"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface DriverInfo {
  _id: string;
  name: string;
  phone: string;
  imageUrl: string;
  busID: string;
  routeID: string;
}

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
}

import ThemeToggle from "@/components/ThemeToggle";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";

import Map from "@/components/admin/Map";

import { Overview } from "@/components/admin/overview";
import { RecentSales } from "@/components/admin/recent-sales";
import AuthButton from "@/components/admin/AuthButton";
import AddDriver from "@/components/admin/AddDriver";
import DisplayDriver from "@/components/admin/DisplayDriver";
import DisplayVehicle from "@/components/admin/DisplayVehicle";
import AddVehicle from "@/components/admin/AddVehicle";

export default function DashboardPage() {
  const [driverInformation, setDriverInformation] = useState<DriverInfo[]>([]);
  const [vehicleInformation, setVehicleInformation] = useState<VehicleInfo[]>(
    []
  );
  const [cookies] = useCookies(["username"]);
  const userName = cookies.username;

  useEffect(() => {
    const fetchDriverInfo = async () => {
      try {
        const response = await axios.get(`${serverUrl}/driver/info`);
        setDriverInformation(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchVehicleInfo = async () => {
      try {
        const response = await axios.get(`${serverUrl}/vehicle/info`);
        setVehicleInformation(response.data);
        // console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDriverInfo();
    fetchVehicleInfo();
  }, []);

  const driversWithBusIDZero = driverInformation.filter(
    (driver) => driver.busID === "0"
  );

  return (
    <>
      <div className="md:hidden flex w-full h-screen justify-center items-center text-3xl font-bold">
        <h1>Not Supported</h1>
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
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Welcome
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
                    <div className="text-2xl font-bold">
                      {userName || "User"}
                    </div>
                  </CardContent>
                </Card>
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
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Vehicles
                    </CardTitle>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path
                        fill="currentColor"
                        d="M0 5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v2h-2V5H2v7h6v2H2v4h6v2H5.414L3.5 21.914L2.086 20.5l.5-.5H2a2 2 0 0 1-2-2V5Zm11.323 3h10.354L24 13.807V21.5h-2V20H11v1.5H9v-7.693L11.323 8ZM11 18h11v-3.807L21.923 14H11.077l-.077.193V18Zm.877-6h9.246l-.8-2h-7.646l-.8 2ZM3 15h2.004v2.004H3V15Zm9 0h2.004v2.004H12V15Zm7 0h2.004v2.004H19V15Z"
                      />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {vehicleInformation.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Available Drivers
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path
                        fill="currentColor"
                        d="M5 6a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm-3 7c0-1.113.903-2 2.009-2h6.248A5.477 5.477 0 0 0 9 14.5c0 1.303.453 2.5 1.21 3.443c-.395.038-.8.057-1.21.057c-1.855 0-3.583-.386-4.865-1.203C2.833 15.967 2 14.69 2 13Zm17 1.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-2.146-1.854a.5.5 0 0 0-.708 0L13.5 15.293l-.646-.647a.5.5 0 0 0-.708.708l1 1a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0 0-.708Z"
                      />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {driversWithBusIDZero.length}
                    </div>
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
                <Card className="col-span-4 lg:col-span-3">
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
            <TabsContent value="map" className="space-y-4">
              <Map />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
