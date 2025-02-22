"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Springfield High",
    total: 45,
  },
  {
    name: "Central Academy",
    total: 38,
  },
  {
    name: "Westfield High",
    total: 35,
  },
  {
    name: "St. Mary's",
    total: 32,
  },
  {
    name: "Riverdale High",
    total: 28,
  },
]

export function ParticipantsBySchool() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" fontSize={12} width={100} />
        <Bar dataKey="total" fill="currentColor" radius={[0, 4, 4, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

