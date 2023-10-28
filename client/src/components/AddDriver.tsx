import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SyntheticEvent } from "react";

export default function DriverRegister() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [license, setLicense] = useState("");
  const [busID, setBusID] = useState("");
  const [routeID, setRouteID] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/driver/info", {
        name,
        birthdate,
        phone,
        imageUrl,
        license,
        busID,
        routeID,
        experience,
        bio,
      });
      alert("Driver Registration Completed!");
      // You can redirect to a different page if needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Driver Registration</CardTitle>
        </CardHeader>
        <CardContent className="grid w-96 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="text"
              placeholder="YYYY-MM-DD"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="number"
              placeholder="Your ten digit mobile number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              type="number"
              placeholder="Driver's License Number"
              value={license}
              onChange={(event) => setLicense(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="busID">Bus ID</Label>
            <Input
              id="busID"
              type="text"
              placeholder="Bus ID"
              value={busID}
              onChange={(event) => setBusID(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="routeID">Route ID</Label>
            <Input
              id="routeID"
              type="text"
              placeholder="Route ID"
              value={routeID}
              onChange={(event) => setRouteID(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              type="number"
              placeholder="Years of experience"
              value={experience}
              onChange={(event) => setExperience(event.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              type="text"
              placeholder="Short Bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid gap-3 w-full">
            <Button className="w-full" type="submit">
              Register
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
