import axios from "axios";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  color: string;
}

export default function TableVehicles() {
  const [vehicleInformation, setVehicleInformation] = useState<VehicleInfo[]>(
    []
  );

  useEffect(() => {
    const fetchVehicleInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vehicle/info");
        setVehicleInformation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicleInfo();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Plate Number</TableHead>
          <TableHead>Color</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicleInformation.map((info) => (
          <TableRow key={info._id}>
            <TableCell>{info.vehicleID}</TableCell>
            <TableCell>{info.model}</TableCell>
            <TableCell>{info.year}</TableCell>
            <TableCell>{info.plateNumber}</TableCell>
            <TableCell>{info.color}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
