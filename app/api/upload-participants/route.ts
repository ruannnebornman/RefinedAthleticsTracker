import { NextResponse } from "next/server"
import { processExcel } from "@/lib/process-excel"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Process the Excel file
    const buffer = await file.arrayBuffer()
    const participants = await processExcel(buffer)

    // Here you would typically save the participants to your database
    // For now, we'll just return the count
    return NextResponse.json({
      success: true,
      count: participants.length,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 })
  }
}

