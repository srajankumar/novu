"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useGetDriverID } from "@/hooks/useGetDriverID";

export default function AddDriver() {
  const driverID = useGetDriverID();
  const [information, setInformation] = useState({
    name: "",
    birthdate: "",
    blood: "",
    phone: "+91",
    imageUrl: "",
    license: "",
    busID: "",
    routeID: "",
    from: "",
    to: "",
    experience: 0,
    bio: "",
    email: "",
    username: "",
    password: "",

    userOwner: driverID,
  });

  const clearForm = () => {
    setInformation({
      name: "",
      birthdate: "",
      blood: "",
      phone: "+91",
      imageUrl: "",
      license: "",
      busID: "",
      routeID: "",
      from: "",
      to: "",
      experience: 0,
      bio: "",
      email: "",
      username: "",
      password: "",

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
      await axios.post("https://novu.onrender.com/driver/info", information);
      alert("Driver Information Added");
      clearForm();
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
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              //   value={username}
              //   onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="number"
              placeholder="Your ten-digit mobile number"
              name="phone"
              onChange={handleChange}
              //   value={phone}
              //   onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
              onChange={handleChange}
              //   value={email}
              //   onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="text"
              placeholder="YYYY-MM-DD"
              name="birthdate"
              onChange={handleChange}
              //   value={birthdate}
              //   onChange={(event) => setBirthdate(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="blood">Blood Group</Label>
            <Input
              id="blood"
              type="text"
              placeholder="AB+"
              name="blood"
              onChange={handleChange}
              //   value={blood}
              //   onChange={(event) => setBirthdate(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              onChange={handleChange}
              //   value={imageUrl}
              //   onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              type="text"
              placeholder="Driver's License"
              name="license"
              onChange={handleChange}
              //   value={license}
              //   onChange={(event) => setLicense(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="busID">Bus ID</Label>
            <Input
              id="busID"
              type="text"
              placeholder="Bus ID"
              name="busID"
              onChange={handleChange}
              //   value={busID}
              //   onChange={(event) => setBusID(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="routeID">Route ID</Label>
            <Input
              id="routeID"
              type="text"
              placeholder="Route ID"
              name="routeID"
              onChange={handleChange}
              //   value={routeID}
              //   onChange={(event) => setRouteID(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              type="text"
              placeholder="From"
              name="from"
              onChange={handleChange}
              //   value={routeID}
              //   onChange={(event) => setRouteID(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="routeID">To</Label>
            <Input
              id="to"
              type="text"
              placeholder="To"
              name="to"
              onChange={handleChange}
              //   value={routeID}
              //   onChange={(event) => setRouteID(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Experience (years)</Label>
            <Input
              id="experience"
              type="number"
              placeholder="Years of Experience"
              name="experience"
              onChange={handleChange}
              //   value={experience}
              //   onChange={(event) => setExperience(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>

            <Textarea
              id="bio"
              placeholder="Driver's Bio"
              name="bio"
              onChange={handleChange}
              //   value={bio}
              //   onChange={(event) => setBio(event.target.value)}
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
