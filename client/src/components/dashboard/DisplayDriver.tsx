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

const drivers = [
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
  {
    url: "https://github.com/shadcn.png",
    name: "Driver Name",
    phone: "0123456789",
    email: "driver123@gmail.com",
    busId: "123",
    routeId: "456",
  },
];

export default function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Driver</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Bus ID</TableHead>
          <TableHead>Route ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => (
          <TableRow key={driver.name}>
            <TableCell>
              <Avatar>
                <AvatarImage src={driver.url} alt="@shadcn" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{driver.name}</TableCell>
            <TableCell>{driver.phone}</TableCell>
            <TableCell>{driver.email}</TableCell>
            <TableCell>{driver.busId}</TableCell>
            <TableCell>{driver.routeId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
