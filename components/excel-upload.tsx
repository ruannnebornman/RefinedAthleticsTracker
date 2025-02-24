"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export function ExcelUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const fileType = file.name.split(".").pop()?.toLowerCase()
    if (!["xlsx", "xls"].includes(fileType || "")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
      })
      return
    }

    try {
      setIsUploading(true)
      setProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-participants", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setProgress(100)

      toast({
        title: "Upload successful",
        description: `${data.count} participants added successfully.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
      })
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={isUploading}
          className="relative"
          onClick={() => document.getElementById("excel-upload")?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Participants
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </Button>
        <span className="text-sm text-muted-foreground">Upload Excel file (.xlsx, .xls)</span>
      </div>
      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">Uploading... {progress}%</p>
        </div>
      )}
    </div>
  )
}

