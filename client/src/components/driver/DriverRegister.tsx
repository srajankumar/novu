"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

interface Errors {
  username?: string;
  phone?: string;
  email?: string;
  password?: string;
}

export default function DriverRegister() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Errors>({});

  const validateForm = async (): Promise<boolean> => {
    const errors: Errors = {};

    if (!username.trim()) {
      errors.username = "Please enter a name.";
    }

    if (!phone.trim()) {
      errors.phone = "Please enter a phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    } else {
      // Check if a driver with the provided phone number already exists
      try {
        const response: { data: { message: string } } = await axios.get(
          `${serverUrl}/driver/checkDriver/${phone}`
        );

        if (
          response.data.message ===
          "Driver with this phone number already exists!"
        ) {
          errors.phone = "Driver with this phone number already exists.";
        }
      } catch (error) {
        console.error("Error checking driver existence:", error);
        alert("Error checking driver existence:");
      }
    }

    if (!email.trim()) {
      errors.email = "Please enter an email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      errors.password = "Please enter a password.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (await validateForm()) {
      try {
        const response: { data: { message: string } } = await axios.post(
          `${serverUrl}/driver/register`,
          {
            username,
            phone,
            email,
            password,
          }
        );

        if (response.data.message === "Driver already exists!") {
          // Display an alert if the driver already exists
          alert("Driver already exists! Please log in.");
          window.location.href = "/driver/login";
        } else {
          // Registration successful
          alert("Registration Completed! Login to continue");
          window.location.href = "/driver/login";
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please correct the form errors before submitting.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent className="grid w-96 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              type="text"
              placeholder="Chiara Rossi"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {formErrors.username && (
              <p className="text-red-500 text-sm">{formErrors.username}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel" // Change type to 'tel' for phone numbers
              placeholder="9998887777"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm">{formErrors.phone}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="chiara.rossi@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="A Strong Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid gap-3 w-full">
            <Button className="w-full" type="submit">
              Create account
            </Button>
            <div className="space-x-2 text-sm">
              <span>Already have an account?</span>
              <Link href="/driver/login" className="hover:underline">
                Login
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
