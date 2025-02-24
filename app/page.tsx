import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MonitorIcon as Running, Users } from "lucide-react"
import Link from "next/link"
import { EventList } from "@/components/event-list"
import { ExcelUpload } from "@/components/excel-upload"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <Suspense fallback={null}>
            <ExcelUpload />
          </Suspense>
          <Link href="/events/new">
            <Button>
              <CalendarDays className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </Link>
          <Link href="/participants/new">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Participant
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Races</CardTitle>
            <Running className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
          <Link href="/events">
            <Button variant="link">View all events</Button>
          </Link>
        </div>
        <Suspense fallback={null}>
          <EventList />
        </Suspense>
      </div>
    </div>
  )
}

