"use server"

import * as XLSX from "xlsx"

export type Participant = {
  name: string
  age: number
  gender: string
  school: string
  team: string
}

export async function processExcel(buffer: ArrayBuffer): Promise<Participant[]> {
  try {
    // Read the Excel file
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" })

    // Get the first worksheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    // Convert to JSON with header row
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false })

    // Validate and transform the data
    const participants = jsonData.map((row: any) => {
      // Validate required fields
      if (!row.name || !row.age || !row.gender || !row.school) {
        throw new Error("Missing required fields in Excel file")
      }

      // Ensure age is a valid number
      const age = Number.parseInt(row.age)
      if (isNaN(age) || age < 0) {
        throw new Error("Invalid age value in Excel file")
      }

      return {
        name: String(row.name).trim(),
        age,
        gender: String(row.gender).trim(),
        school: String(row.school).trim(),
        team: row.team ? String(row.team).trim() : "",
      }
    })

    return participants
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to process Excel file")
  }
}

