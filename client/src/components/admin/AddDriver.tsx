"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useGetDriverID } from "@/hooks/useGetDriverID";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function AddDriver() {
  const driverID = useGetDriverID();
  const [information, setInformation] = useState({
    name: "",
    birthdate: "",
    blood: "",
    phone: "",
    imageUrl: "",
    license: "",
    busID: "",
    routeID: "",
    from: "",
    to: "",
    experience: "",
    bio: "",
    email: "",
    username: "",
    password: "",
    time: "",
    userOwner: driverID,
  });

  const clearForm = () => {
    setInformation({
      name: "",
      birthdate: "",
      blood: "",
      phone: "",
      imageUrl: "",
      license: "",
      busID: "",
      routeID: "",
      from: "",
      to: "",
      experience: "",
      bio: "",
      email: "",
      username: "",
      password: "",
      time: "",
      userOwner: driverID,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInformation({ ...information, [name]: value });
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post(`${serverUrl}/driver/info`, information);
      alert("Driver Information Added");
      clearForm();
      // console.log(information);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex pb-20 justify-center">
      <div className="flex flex-col w-full lg:px-40">
        <div className="text-2xl font-bold py-10">Add Driver</div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Full Name</Label>
            <Input
              required
              value={information.name}
              id="username"
              type="text"
              placeholder="Chiara Rossi"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              required
              value={information.phone}
              id="phone"
              type="number"
              placeholder="9998887777"
              name="phone"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={information.email}
              id="email"
              type="email"
              placeholder="chiara.rossi@example.com"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              value={information.birthdate}
              id="birthdate"
              type="text"
              placeholder="1985-08-27"
              name="birthdate"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="blood">Blood Group</Label>
            <Input
              value={information.blood}
              id="blood"
              type="text"
              placeholder="A-"
              name="blood"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              value={information.license}
              id="license"
              type="text"
              placeholder="DL876543"
              name="license"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="experience">Experience ( in years )</Label>
            <Input
              value={information.experience}
              id="experience"
              type="number"
              placeholder="6"
              name="experience"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              value={information.bio}
              id="bio"
              placeholder="Chiara Rossi is an experienced bus driver with 6 years of service in the industry. She takes pride in her safe and reliable driving and is dedicated to providing passengers with a comfortable and secure journey."
              name="bio"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              required
              value={information.imageUrl}
              id="imageUrl"
              type="text"
              placeholder="https://example.com/chiara_rossi.jpg"
              name="imageUrl"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="busID">Vehicle ID</Label>
            <Input
              required
              value={information.busID}
              id="busID"
              type="text"
              placeholder="0001"
              name="busID"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="routeID">Route ID</Label>
            <Input
              required
              value={information.routeID}
              id="routeID"
              type="text"
              placeholder="3A"
              name="routeID"
              onChange={handleChange}
            />
          </div>

          <div className="gap-2 grid">
            <Label htmlFor="latitude">Route</Label>
            <div className="flex gap-4">
              <Input
                required
                value={information.from}
                id="from"
                type="text"
                placeholder="From"
                name="from"
                onChange={handleChange}
              />
              <Input
                required
                value={information.to}
                id="to"
                type="text"
                placeholder="To"
                name="to"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time">Timings</Label>
            <Input
              required
              value={information.time}
              id="time"
              type="text"
              placeholder="9:00 - 10:30"
              name="time"
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Button className="w-full" type="submit">
              Add Driver
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
