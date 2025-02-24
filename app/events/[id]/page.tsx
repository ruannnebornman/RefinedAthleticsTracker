import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Clock, MapPin } from "lucide-react"
import Link from "next/link"

// This data would typically come from your database
// For static export, we need to define all possible events
const events = [
  {
    id: "1",
    name: "100m Dash - Boys",
    date: "2024-03-01",
    time: "10:00 AM",
    location: "Main Track",
    description: "Boys 100m dash qualifying round",
    participants: [
      {
        id: 1,
        name: "John Smith",
        age: 16,
        gender: "Male",
        school: "Springfield High",
        team: "Tigers",
      },
      {
        id: 2,
        name: "Michael Johnson",
        age: 17,
        gender: "Male",
        school: "Central Academy",
        team: "Eagles",
      },
      {
        id: 3,
        name: "David Brown",
        age: 16,
        gender: "Male",
        school: "Westfield High",
        team: "Lions",
      },
    ],
  },
  {
    id: "2",
    name: "200m Sprint - Girls",
    date: "2024-03-01",
    time: "11:00 AM",
    location: "Main Track",
    description: "Girls 200m sprint qualifying round",
    participants: [],
  },
  {
    id: "3",
    name: "4x100m Relay - Mixed",
    date: "2024-03-01",
    time: "2:00 PM",
    location: "Main Track",
    description: "Mixed team relay qualifying round",
    participants: [],
  },
]

// Required for static site generation with dynamic routes
export function generateStaticParams() {
  return events.map((event) => ({
    id: event.id,
  }))
}

interface PageProps {
  params: {
    id: string
  }
}

export default function EventDetails({ params }: PageProps) {
  const eventDetails = events.find((event) => event.id === params.id)

  if (!eventDetails) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Event not found</h1>
        <Link href="/" className="mt-4">
          <Button variant="link">Return to Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6 p-8">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Event Details</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{eventDetails.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {eventDetails.date} at {eventDetails.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{eventDetails.location}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{eventDetails.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Participants</CardTitle>
            <Button>Add Participant</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Team</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventDetails.participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>{participant.age}</TableCell>
                    <TableCell>{participant.gender}</TableCell>
                    <TableCell>{participant.school}</TableCell>
                    <TableCell>{participant.team}</TableCell>
                  </TableRow>
                ))}
                {eventDetails.participants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No participants yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

