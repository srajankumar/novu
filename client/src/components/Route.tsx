import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleMap from "@/components/dashboard/MapRoute";

const routeCoordinates = {
  "00001": {
    fromLatitude: 12.8854,
    fromLongitude: 74.8417,
    toLatitude: 12.768676,
    toLongitude: 75.207062,
  },
  "0002": {
    fromLatitude: 12.8854,
    fromLongitude: 74.8417,
    toLatitude: 12.768676,
    toLongitude: 75.207062,
  },
  "0005": {
    fromLatitude: 12.1234,
    fromLongitude: 34.5678,
    toLatitude: 12.4321,
    toLongitude: 34.8765,
  },
  // Add more route coordinates as needed
};

interface RouteMapProps {
  userName: string;
}

export default function RouteMap({ userName }: RouteMapProps) {
  const [routeID, setRouteID] = useState<string | null>(null);

  useEffect(() => {
    const fetchRouteID = async () => {
      try {
        const driverResponse = await axios.get(
          `http://localhost:3001/driver/info?name=${userName}`
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

        const driverRouteID = matchingDriver.routeID;

        setRouteID(driverRouteID);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRouteID();
  }, [userName]);

  const routeInformation = routeCoordinates[routeID];

  return (
    <div>
      {routeInformation && (
        <GoogleMap
          fromLatitude={routeInformation.fromLatitude}
          fromLongitude={routeInformation.fromLongitude}
          toLatitude={routeInformation.toLatitude}
          toLongitude={routeInformation.toLongitude}
        />
      )}
    </div>
  );
}
