"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 45,
  },
  {
    name: "Feb",
    total: 38,
  },
  {
    name: "Mar",
    total: 62,
  },
  {
    name: "Apr",
    total: 51,
  },
  {
    name: "May",
    total: 55,
  },
  {
    name: "Jun",
    total: 67,
  },
  {
    name: "Jul",
    total: 42,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

