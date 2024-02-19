"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
const AuthButton = () => {
  const [cookies, setCookies, removeCookies] = useCookies([
    "access_token",
    "username",
  ]);

  const logout = () => {
    // Remove userID from local storage
    window.localStorage.removeItem("userID");

    // Remove cookies
    removeCookies("access_token");
    removeCookies("username");
    window.location.href = "/";
  };

  return (
    <div>
      <Button onClick={logout} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default AuthButton;
