import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const GoogleMap = dynamic(() => import("@/components/driver/MapRoute"), {
  ssr: false,
});

type RouteCoordinates = {
  [key: string]: {
    fromLatitude: number;
    fromLongitude: number;
    toLatitude: number;
    toLongitude: number;
  };
};

const routeCoordinates: RouteCoordinates = {
  "1": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9417468,
    toLongitude: 74.8514039,
  },
  "1A": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.8893897,
    toLongitude: 74.783423,
  },
  "1B": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9075785,
    toLongitude: 74.8249948,
  },
  "2": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 13.0217652,
    toLongitude: 74.7903818,
  },
  "2A": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 13.0649255,
    toLongitude: 74.7758675,
  },
  "2C": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9605753,
    toLongitude: 74.839527,
  },
  "2D": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9679362,
    toLongitude: 74.7142011,
  },
  "2E": {
    fromLatitude: 12.8688458,
    fromLongitude: 74.8556288,
    toLatitude: 12.9810199,
    toLongitude: 74.8797253,
  },
  "2F": {
    fromLatitude: 12.8688458,
    fromLongitude: 74.8556288,
    toLatitude: 12.9810199,
    toLongitude: 74.8797253,
  },
  "3": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9285486,
    toLongitude: 74.8786093,
  },
  "3A": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9285486,
    toLongitude: 74.8786093,
  },
  "3B": {
    fromLatitude: 12.8494195,
    fromLongitude: 74.7701654,
    toLatitude: 12.9285486,
    toLongitude: 74.8786093,
  },
  "3D": {
    fromLatitude: 12.8630128,
    fromLongitude: 74.8346099,
    toLatitude: 12.9196543,
    toLongitude: 74.8900598,
  },
  "10A": {
    fromLatitude: 12.8630057,
    fromLongitude: 74.8370807,
    toLatitude: 12.8680635,
    toLongitude: 74.9246103,
  },
};

interface RouteMapProps {
  userName: string;
}

export default function RouteMap({ userName }: RouteMapProps) {
  const [routeIDs, setRouteIDs] = useState<string[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverRoutes = async () => {
      try {
        const driverResponse = await axios.get(
          `${serverUrl}/driver/info?name=${userName}`
        );

        if (driverResponse.data.length === 0) {
          console.log("Driver not found");
          return;
        }

        const matchingDrivers = driverResponse.data.filter(
          (driver: { name: string }) => driver.name === userName
        );

        if (matchingDrivers.length === 0) {
          console.log("Driver not found");
          return;
        }

        const driverRouteIDs = matchingDrivers.map(
          (driver: { routeID: string }) => driver.routeID
        );

        setRouteIDs(driverRouteIDs);
        setSelectedRoute(driverRouteIDs[0]); // Set the default selection to the first route ID
      } catch (err) {
        console.error(err);
      }
    };

    fetchDriverRoutes();
  }, [userName]);

  const routeInformation = selectedRoute
    ? routeCoordinates[selectedRoute]
    : null;

  const handleRouteSelect = (selectedRoute: string) => {
    setSelectedRoute(selectedRoute);
  };

  return (
    <div>
      <div>
        <select
          className="border border-input text-xs md:text-base bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 mb-5 mt-2"
          onChange={(e) => handleRouteSelect(e.target.value)}
          value={selectedRoute || ""}
        >
          {routeIDs.map((routeID) => (
            <option key={routeID} value={routeID}>
              {routeID}
            </option>
          ))}
        </select>
      </div>

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
