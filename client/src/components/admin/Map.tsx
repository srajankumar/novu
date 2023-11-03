import React, { useEffect, useState } from "react";
import axios from "axios";
import MapLocation from "../common/MapLocation";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
  latitude: number;
  longitude: number;
}

export default function VehicleTable() {
  const [information, setInformation] = useState<VehicleInfo[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleInfo | null>(
    null
  );
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(`${serverUrl}/vehicle/info`);
        setInformation(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  // Handle the dropdown change
  const handleVehicleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedVehicleId(selectedId);

    // Find the selected vehicle based on the ID
    const selected = information.find((info) => info._id === selectedId);
    setSelectedVehicle(selected || null);
  };

  return (
    <div>
      <select
        className="border border-input text-xs md:text-base bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 mb-5 mt-2"
        id="vehicleDropdown"
        value={selectedVehicleId || ""}
        onChange={handleVehicleSelect}
      >
        <option value="">Select a Vehicle</option>
        {information.map((info) => (
          <option key={info._id} value={info._id}>
            {info.vehicleID}
          </option>
        ))}
      </select>

      {selectedVehicle && (
        <div>
          <MapLocation
            latitude={selectedVehicle.latitude}
            longitude={selectedVehicle.longitude}
          />
        </div>
      )}
    </div>
  );
}
