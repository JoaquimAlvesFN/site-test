import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Setting {
  key: string
  value: string
}

export async function GET() {
  try {
    const settingsData = await prisma.setting.findMany()
    
    // Convert array of settings to object
    const settingsObject = settingsData.reduce((acc: Record<string, string>, setting: Setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    return NextResponse.json(settingsObject)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
} 