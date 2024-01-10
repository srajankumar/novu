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

export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Errors>({});

  const validateForm = async (): Promise<boolean> => {
    const errors: Errors = {};

    if (!username.trim()) {
      errors.username = "Please enter a username.";
    }

    if (!phone.trim()) {
      errors.phone = "Please enter a phone number.";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    } else {
      // Check if a user with the provided phone number already exists
      try {
        const response = await axios.get(
          `${serverUrl}/auth/checkUser/${phone}`
        );
        if (response.data.exists) {
          errors.phone = "User with this phone number already exists.";
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
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
        await axios.post(`${serverUrl}/auth/register`, {
          username,
          phone,
          email,
          password,
        });
        alert("Registration Completed! Login to continue");
        window.location.href = "/admin/login";
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
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="John Miller"
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
              placeholder="6665554444"
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
              placeholder="john.miller@example.com"
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
              <Link href="/admin/login" className="hover:underline">
                Login
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
