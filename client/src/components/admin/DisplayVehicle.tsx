// import axios from "axios";
// import { useEffect, useState } from "react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface VehicleInfo {
//   _id: string;
//   vehicleID: string;
//   model: string;
//   year: string;
//   plateNumber: string;
//   color: string;
// }

// export default function TableVehicles() {
//   const [vehicleInformation, setVehicleInformation] = useState<VehicleInfo[]>(
//     []
//   );

//   useEffect(() => {
//     const fetchVehicleInfo = async () => {
//       try {
//         const response = await axios.get("https://novu.onrender.com/vehicle/info");
//         setVehicleInformation(response.data);
//         console.log(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchVehicleInfo();
//   }, []);

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Vehicle ID</TableHead>
//           <TableHead>Model</TableHead>
//           <TableHead>Year</TableHead>
//           <TableHead>Plate Number</TableHead>
//           <TableHead>Color</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {vehicleInformation.map((info) => (
//           <TableRow key={info._id}>
//             <TableCell>{info.vehicleID}</TableCell>
//             <TableCell>{info.model}</TableCell>
//             <TableCell>{info.year}</TableCell>
//             <TableCell>{info.plateNumber}</TableCell>
//             <TableCell>{info.color}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Pencil, Save, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

interface VehicleInfo {
  _id: string;
  vehicleID: string;
  model: string;
  year: string;
  plateNumber: string;
  latitude: string;
  longitude: string;
  color: string;
}

export default function VehicleTable() {
  const [information, setInformation] = useState<VehicleInfo[]>([]);
  const [editedData, setEditedData] = useState<Partial<VehicleInfo>>({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          "https://novu.onrender.com/vehicle/info"
        );
        setInformation(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  const handleEdit = (vehicleId: string) => {
    const rowToEdit = information.find((info) => info._id === vehicleId);
    if (rowToEdit) {
      setEditedData(rowToEdit);
    }
  };

  const handleSave = async (vehicleId: string) => {
    try {
      const response = await axios.put(
        `https://novu.onrender.com/vehicle/info/${vehicleId}`,
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
      // Send a DELETE request to the server to delete the driver info
      await axios.delete(`https://novu.onrender.com/vehicle/info/${vehicleId}`);

      // Update the data by removing the deleted driver
      setInformation((prevData) =>
        prevData.filter((info) => info._id !== vehicleId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Plate Number</TableHead>
          <TableHead>Latitude</TableHead>
          <TableHead>Longitude</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {information.map((info) => (
          <TableRow key={info._id}>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.vehicleID || info.vehicleID}
                  onChange={(e) =>
                    setEditedData({ ...editedData, vehicleID: e.target.value })
                  }
                />
              ) : (
                info.vehicleID
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.model || info.model}
                  onChange={(e) =>
                    setEditedData({ ...editedData, model: e.target.value })
                  }
                />
              ) : (
                info.model
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.color || info.color}
                  onChange={(e) =>
                    setEditedData({ ...editedData, color: e.target.value })
                  }
                />
              ) : (
                info.color
              )}
            </TableCell>

            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.plateNumber || info.plateNumber}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      plateNumber: e.target.value,
                    })
                  }
                />
              ) : (
                info.plateNumber
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.latitude || info.latitude}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      latitude: e.target.value,
                    })
                  }
                />
              ) : (
                info.latitude
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.longitude || info.longitude}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      longitude: e.target.value,
                    })
                  }
                />
              ) : (
                info.longitude
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <div className="flex space-x-5">
                  <button onClick={() => handleSave(info._id)}>
                    <Save className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(info._id)}>
                    <Trash className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-5">
                  <button onClick={() => handleEdit(info._id)}>
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(info._id)}>
                    <Trash className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
