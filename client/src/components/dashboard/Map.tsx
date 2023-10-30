import React, { useEffect, useState } from "react";
import axios from "axios";
import MapLocation from "./MapLocation"; // Assuming you have a MapLocation component

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
  // Add latitude and longitude properties to VehicleInfo
  latitude: number;
  longitude: number;
}

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function VehicleTable() {
  const [information, setInformation] = useState<VehicleInfo[]>([]);
  const [editedData, setEditedData] = useState<Partial<VehicleInfo>>({});
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleInfo | null>(
    null
  );
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vehicle/info");
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

  const handleEdit = (vehicleId: string) => {
    const rowToEdit = information.find((info) => info._id === vehicleId);
    if (rowToEdit) {
      setEditedData(rowToEdit);
    }
  };

  const handleSave = async (vehicleId: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/vehicle/info/${vehicleId}`,
        editedData
      );

      const updatedInformation = information.map((info) => {
        if (info._id === vehicleId) {
          return { ...info, ...response.data };
        }
        return info;
      });

      setInformation(updatedInformation);
      setEditedData({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (vehicleId: string) => {
    try {
      // Send a DELETE request to the server to delete the vehicle info
      await axios.delete(`http://localhost:3001/vehicle/info/${vehicleId}`);

      // Update the data by removing the deleted vehicle
      setInformation((prevData) =>
        prevData.filter((info) => info._id !== vehicleId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Dropdown to select a vehicle */}
      <select
        className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 mb-5 mt-2"
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
