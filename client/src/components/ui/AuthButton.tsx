"use client";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
const AuthButton = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.location.href = "/";
  };

  return (
    <div>
      {!cookies.access_token ? (
        <Link
          href="/login"
          className="md:pl-10 hover:underline hover:underline-offset-4 focus:underline focus:underline-offset-8 block py-2 rounded focus:text-[#ffc20d] md:hover:bg-transparent"
        >
          Login
        </Link>
      ) : (
        <li>
          <button
            className="md:pl-10 hover:underline hover:text-red-400 hover:underline-offset-4 focus:underline focus:underline-offset-8 block py-2 rounded md:hover:bg-transparent"
            onClick={logout}
          >
            Log Out
          </button>
        </li>
      )}
    </div>
  );
};

export default AuthButton;
