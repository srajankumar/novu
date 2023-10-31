import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

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

        const driverRouteID = matchingDriver.routeID;

        setRouteID(driverRouteID);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRouteID();
  }, [userName]);

  const routeInformation = routeID ? routeCoordinates[routeID] : null;

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
