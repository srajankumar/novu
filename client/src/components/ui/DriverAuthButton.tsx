"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
const DriverAuthButton = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.location.href = "/";
  };

  return (
    <div>
      {!cookies.access_token ? (
        <Link href="/driver/login">
          <Button variant="outline">Login</Button>
        </Link>
      ) : (
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      )}
    </div>
  );
};

export default DriverAuthButton;
