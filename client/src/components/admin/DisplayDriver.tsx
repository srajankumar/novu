import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil, Save, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

interface DriverInfo {
  _id: string;
  name: string;
  phone: string;
  imageUrl: string;
  busID: string;
  routeID: string;
  from: string;
  to: string;
  // Add other fields here
}

export default function TableDemo() {
  const [information, setInformation] = useState<DriverInfo[]>([]);
  const [editedData, setEditedData] = useState<Partial<DriverInfo>>({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(
          "https://novu.onrender.com/driver/info"
        );
        setInformation(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  const handleEdit = (driverId: string) => {
    const rowToEdit = information.find((info) => info._id === driverId);
    if (rowToEdit) {
      setEditedData(rowToEdit);
    }
  };

  const handleSave = async (driverId: string) => {
    try {
      const response = await axios.put(
        `https://novu.onrender.com/driver/info/${driverId}`,
        editedData
      );

      // Update the data with the updated values
      const updatedInformation = information.map((info) => {
        if (info._id === driverId) {
          return { ...info, ...response.data };
        }
        return info;
      });

      // Save the updated data
      setInformation(updatedInformation);
      // Clear the edited data
      setEditedData({});
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (driverId: string) => {
    try {
      // Send a DELETE request to the server to delete the driver info
      await axios.delete(`https://novu.onrender.com/driver/info/${driverId}`);

      // Update the data by removing the deleted driver
      setInformation((prevData) =>
        prevData.filter((info) => info._id !== driverId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Driver</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Route ID</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {information.map((info) => (
          <TableRow key={info._id}>
            <TableCell>
              <Avatar>
                <AvatarImage src={info.imageUrl} alt={info.name} />
                <AvatarFallback>{info.name}</AvatarFallback>
              </Avatar>
            </TableCell>
            {/* <TableCell>
              {editedData._id === info._id ? (
                <input
                  type="text"
                  value={editedData.name || info.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              ) : (
                info.name
              )}
            </TableCell> */}
            <TableCell>{info.name}</TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.phone || info.phone}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phone: e.target.value })
                  }
                />
              ) : (
                info.phone
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.busID || info.busID}
                  onChange={(e) =>
                    setEditedData({ ...editedData, busID: e.target.value })
                  }
                />
              ) : (
                info.busID
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.routeID || info.routeID}
                  onChange={(e) =>
                    setEditedData({ ...editedData, routeID: e.target.value })
                  }
                />
              ) : (
                info.routeID
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.from || info.from}
                  onChange={(e) =>
                    setEditedData({ ...editedData, from: e.target.value })
                  }
                />
              ) : (
                info.from
              )}
            </TableCell>
            <TableCell>
              {editedData._id === info._id ? (
                <Input
                  type="text"
                  value={editedData.to || info.to}
                  onChange={(e) =>
                    setEditedData({ ...editedData, to: e.target.value })
                  }
                />
              ) : (
                info.to
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
            {/* <TableCell>
              <button onClick={() => handleDelete(info._id)}>
                <Trash className="w-5 h-5" />
              </button>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
