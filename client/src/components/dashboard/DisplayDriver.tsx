import axios from "axios";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DriverInfo {
  _id: string;
  name: string;
  phone: string;
  imageUrl: string;
  busID: string;
  routeID: string;
  from: string;
  to: string;
}

export default function TableDemo() {
  const [information, setInformation] = useState<DriverInfo[]>([]); // Specify the type here

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/driver/info");
        setInformation(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInfo();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Driver</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          {/* <TableHead>Email</TableHead> */}
          <TableHead>Bus ID</TableHead>
          <TableHead>Route ID</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {information.map((info) => (
          <TableRow key={info.name}>
            <TableCell>
              <Avatar>
                <AvatarImage src={info.imageUrl} alt="@shadcn" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{info.name}</TableCell>
            <TableCell>{info.phone}</TableCell>
            {/* <TableCell>{info.email}</TableCell> */}
            <TableCell>{info.busID}</TableCell>
            <TableCell>{info.routeID}</TableCell>
            <TableCell>{info.from}</TableCell>
            <TableCell>{info.to}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
