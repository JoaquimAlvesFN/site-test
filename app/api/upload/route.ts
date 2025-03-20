import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { db, images, getTimestamp } from "@/lib/db"
import { mkdir } from "fs/promises"

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

    // Gerar um nome de arquivo único
    const fileName = `${uuidv4()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`

    // Criar diretório de uploads se não existir
    const uploadDir = join(process.cwd(), "public", "uploads")
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      console.error("Erro ao criar diretório de uploads:", error)
    }

    // Converter o arquivo para um buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Salvar o arquivo no diretório de uploads
    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // URL pública do arquivo
    const fileUrl = `/uploads/${fileName}`

    // Salvar informações do arquivo no banco de dados
    await db.insert(images).values({
      name: file.name,
      url: fileUrl,
      size: file.size,
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    })

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

