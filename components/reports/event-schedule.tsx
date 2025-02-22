import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const events = [
  {
    id: 1,
    name: "100m Dash - Boys",
    date: "2024-03-01",
    time: "10:00 AM",
    participants: 24,
  },
  {
    id: 2,
    name: "200m Sprint - Girls",
    date: "2024-03-01",
    time: "11:00 AM",
    participants: 18,
  },
  {
    id: 3,
    name: "4x100m Relay - Mixed",
    date: "2024-03-01",
    time: "2:00 PM",
    participants: 32,
  },
  {
    id: 4,
    name: "Long Jump - Boys",
    date: "2024-03-02",
    time: "10:00 AM",
    participants: 15,
  },
  {
    id: 5,
    name: "High Jump - Girls",
    date: "2024-03-02",
    time: "11:00 AM",
    participants: 12,
  },
]

export function EventSchedule() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Participants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.time}</TableCell>
            <TableCell className="text-right">{event.participants}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

