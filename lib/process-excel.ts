import * as XLSX from "xlsx"

type Participant = {
  name: string
  age: number
  gender: string
  school: string
  team: string
}

export async function processExcel(buffer: ArrayBuffer): Promise<Participant[]> {
  // Read the Excel file
  const workbook = XLSX.read(buffer, { type: "array" })

  // Get the first worksheet
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]

  // Convert to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet)

  // Validate and transform the data
  const participants = jsonData.map((row: any) => {
    // Validate required fields
    if (!row.name || !row.age || !row.gender || !row.school) {
      throw new Error("Missing required fields")
    }

    return {
      name: String(row.name),
      age: Number(row.age),
      gender: String(row.gender),
      school: String(row.school),
      team: row.team ? String(row.team) : "",
    }
  })

  return participants
}

