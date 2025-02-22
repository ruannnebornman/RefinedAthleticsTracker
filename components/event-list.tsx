import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

const events = [
  {
    id: 1,
    name: "100m Dash - Boys",
    date: "2024-03-01",
    time: "10:00 AM",
    location: "Main Track",
    participants: 12,
  },
  {
    id: 2,
    name: "200m Sprint - Girls",
    date: "2024-03-01",
    time: "11:00 AM",
    location: "Main Track",
    participants: 8,
  },
  {
    id: 3,
    name: "4x100m Relay - Mixed",
    date: "2024-03-01",
    time: "2:00 PM",
    location: "Main Track",
    participants: 24,
  },
]

export function EventList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Participants</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.time}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.participants}</TableCell>
            <TableCell className="text-right">
              <Link href={`/events/${event.id}`}>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View event details</span>
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

