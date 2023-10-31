import React, { useEffect, useState } from "react";
import axios from "axios";
import MapLocation from "@/components/common/MapLocation";

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  latitude: number;
  longitude: number;
}

interface RecentSalesProps {
  userName: string;
}

export default function RecentSales({ userName }: RecentSalesProps) {
  const [vehicleInformation, setVehicleInformation] =
    useState<VehicleInfo | null>(null);

  useEffect(() => {
    const fetchVehicleInfo = async () => {
      try {
        const driverResponse = await axios.get(
          `https://novu.onrender.com/driver/info?name=${userName}`
        );

        if (driverResponse.data.length === 0) {
          console.log("Driver not found");
          return;
        }

        const matchingDriver = driverResponse.data.find(
          (driver: { name: string }) => driver.name === userName
        );

        if (!matchingDriver) {
          console.log("Driver not found");
          return;
        }

        const busID = matchingDriver.busID;

        const vehicleResponse = await axios.get(
          `https://novu.onrender.com/vehicle/info`
        );

        const matchingVehicle = vehicleResponse.data.find(
          (vehicle: VehicleInfo) => vehicle.vehicleID === busID
        );

        if (matchingVehicle) {
          setVehicleInformation(matchingVehicle);
        } else {
          console.log("Vehicle information not found");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicleInfo();
  }, [userName]);

  return (
    <div>
      {vehicleInformation && (
        <div>
          <MapLocation
            latitude={vehicleInformation.latitude}
            longitude={vehicleInformation.longitude}
          />
        </div>
      )}
    </div>
  );
}
