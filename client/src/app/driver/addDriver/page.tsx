"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import axios from "axios";

export default function AddDriver() {
  return (
    <form className="flex pb-20 justify-center">
      <div className="flex flex-col w-full lg:px-40">
        <div className="text-2xl font-bold py-10">Add Driver</div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              type="text"
              placeholder="Full Name"
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
              //   value={email}
              //   onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Strong Password"
              //   value={password}
              //   onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="text"
              placeholder="YYYY-MM-DD"
              //   value={birthdate}
              //   onChange={(event) => setBirthdate(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="text"
              placeholder="Image URL"
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
              //   value={experience}
              //   onChange={(event) => setExperience(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>

            <Textarea
              id="bio"
              placeholder="Driver's Bio"
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
