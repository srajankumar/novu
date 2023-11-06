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
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9415206,
    toLongitude: 74.854157,
  },

  "7": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.8994669,
    toLongitude: 74.8361301,
  },

  "13": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9029797,
    toLongitude: 74.8357253,
  },

  "1B": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9053247,
    toLongitude: 74.8298392,
  },

  "31": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9001671,
    toLongitude: 74.8258711,
  },

  "31A": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9016396,
    toLongitude: 74.8249463,
  },

  "31B": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9025985,
    toLongitude: 74.8233775,
  },

  "16": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.8893086,
    toLongitude: 74.8216279,
  },

  "16A": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.8893086,
    toLongitude: 74.8216279,
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// const GoogleMap = dynamic(() => import("@/components/driver/MapRoute"), {
//   ssr: false,
// });

// type RouteCoordinates = {
//   [key: string]: {
//     fromLatitude: number;
//     fromLongitude: number;
//     toLatitude: number;
//     toLongitude: number;
//   };
// };

// const routeCoordinates: RouteCoordinates = {
//   "1": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.9415206,
//     toLongitude: 74.854157,
//   },

//   "7": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.8994669,
//     toLongitude: 74.8361301,
//   },

//   "13": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.9029797,
//     toLongitude: 74.8357253,
//   },

//   "1B": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.9053247,
//     toLongitude: 74.8298392,
//   },

//   "31": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.9001671,
//     toLongitude: 74.8258711,
//   },

//   "31A": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.9016396,
//     toLongitude: 74.8249463,
//   },

//   "31B": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.9025985,
//     toLongitude: 74.8233775,
//   },

//   "16": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.8893086,
//     toLongitude: 74.8216279,
//   },

//   "16A": {
//     fromLatitude: 12.8625882,
//     fromLongitude: 74.8366402,
//     toLatitude: 12.8893086,
//     toLongitude: 74.8216279,
//   },
// };

// interface RouteMapProps {
//   userName: string;
// }

// export default function RouteMap({ userName }: RouteMapProps) {
//   const [routeID, setRouteID] = useState<string | null>(null);
//   const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRouteID = async () => {
//       try {
//         const driverResponse = await axios.get(
//           `${serverUrl}/driver/info?name=${userName}`
//         );

//         if (driverResponse.data.length === 0) {
//           console.log("Driver not found");
//           return;
//         }

//         const matchingDriver = driverResponse.data.find(
//           (driver: { name: string }) => driver.name === userName
//         );

//         if (!matchingDriver) {
//           console.log("Driver not found");
//           return;
//         }

//         const driverRouteID = matchingDriver.routeID;

//         setRouteID(driverRouteID);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRouteID();
//   }, [userName]);

//   const routeInformation = routeID ? routeCoordinates[routeID] : null;

//   const handleRouteSelect = (selectedRoute: string) => {
//     setSelectedRoute(selectedRoute);
//     setRouteID(selectedRoute);
//   };

//   return (
//     <div>
//       <div>
//         <label>Select Route ID: </label>
//         <select
//           onChange={(e) => handleRouteSelect(e.target.value)}
//           value={selectedRoute || ""}
//         >
//           <option value="">Select a route</option>
//           {Object.keys(routeCoordinates).map((routeID) => (
//             <option key={routeID} value={routeID}>
//               {routeID}
//             </option>
//           ))}
//         </select>
//       </div>

//       {routeInformation && (
//         <GoogleMap
//           fromLatitude={routeInformation.fromLatitude}
//           fromLongitude={routeInformation.fromLongitude}
//           toLatitude={routeInformation.toLatitude}
//           toLongitude={routeInformation.toLongitude}
//         />
//       )}
//     </div>
//   );
// }
