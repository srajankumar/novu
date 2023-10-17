"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },

  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },

  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },

  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },

  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },

  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
