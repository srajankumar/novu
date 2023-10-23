// Sidebar.js
"use client";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="md:flex fixed z-50 flex-col hidden h-screen w-1/5 bg-background bg-opacity-100">
      <div className="h-fit flex items-center space-x-4 text-2xl mx-10 mt-12 mb-8 font-bold">
        <span>Novu</span>
      </div>
      <ul>
        <li
          className={`ml-5 my-5 rounded-l-2xl ${
            router.pathname === "/dashboard" ? "bg-muted" : "hover:bg-muted"
          } text-base font-medium px-5 py-3`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`ml-5 my-5 rounded-l-2xl ${
            router.pathname === "/schedule" ? "bg-muted" : "hover:bg-muted"
          } text-base font-medium px-5 py-3`}
        >
          <Link href="/schedule">Schedule</Link>
        </li>
        {/* Repeat similar code for other menu items */}
      </ul>
    </div>
  );
};

export default Sidebar;
