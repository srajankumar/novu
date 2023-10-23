"use client";

// import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Register</CardTitle>
      </CardHeader>
      <CardContent className="grid w-96 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Your Password" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid gap-3 w-full">
          <Button className="w-full">Create account</Button>
          <div className="space-x-2 text-sm">
            <span>Do not have an account?</span>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
