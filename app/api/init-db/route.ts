import { NextResponse } from "next/server"
import { initializeSchema } from "../../../lib/db"
import { seedInitialData } from "../../../lib/db-seed"

export async function GET() {
  try {
    // Inicializar o esquema do banco de dados
    const schemaSuccess = await initializeSchema()

    if (!schemaSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to initialize database schema",
        },
        { status: 500 },
      )
    }

    // Seed de dados iniciais
    const seedSuccess = await seedInitialData()

    if (!seedSuccess) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to seed initial data",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized and seeded successfully",
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json(
      { success: false, message: "Error initializing database", error: String(error) },
      { status: 500 },
    )
  }
}

