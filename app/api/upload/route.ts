import { type NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { db, images, getTimestamp } from "@/lib/db"
import { uploadImageToSupabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, message: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Verificar o tipo de arquivo
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Tipo de arquivo não suportado" }, { status: 400 })
    }

    // Verificar o tamanho do arquivo (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "Arquivo muito grande (máximo 5MB)" }, { status: 400 })
    }

    // Upload para o Supabase
    const fileUrl = await uploadImageToSupabase(file)
    
    if (!fileUrl) {
      return NextResponse.json({ success: false, message: "Erro ao fazer upload para o Supabase" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
      name: file.name,
      size: file.size,
    })
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error)
    return NextResponse.json({ success: false, message: "Erro ao processar o upload" }, { status: 500 })
  }
}

