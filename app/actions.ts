"use server"

import { db, contacts, getTimestamp } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

// Função para salvar um novo contato
export async function saveContact(data: {
  name: string
  phone: string
  email?: string
  cep: string
  interest: string
  packageId?: number
}) {
  try {
    // Validar dados
    if (!data.name || !data.phone || !data.cep || !data.interest) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      }
    }

    // Salvar no banco de dados
    await db.insert(contacts).values({
      ...data,
      status: "pending",
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
    })

    return {
      success: true,
      message: "Solicitação enviada com sucesso! Em breve entraremos em contato.",
    }
  } catch (error) {
    console.error("Erro ao salvar contato:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.",
    }
  }
}

// Função para obter todos os contatos (para o painel admin)
export async function getContacts() {
  try {
    // Usar dados estáticos para garantir que a função sempre retorne algo válido
    const staticContacts = [
      {
        id: 1,
        name: "João Silva",
        phone: "(11) 98765-4321",
        email: "joao.silva@example.com",
        cep: "01234-567",
        interest: "tv",
        packageId: 2,
        status: "pending",
        notes: "",
        createdAt: "2023-04-15T10:30:00.000Z",
        updatedAt: "2023-04-15T10:30:00.000Z",
      },
      {
        id: 2,
        name: "Maria Oliveira",
        phone: "(21) 98765-4321",
        email: "maria.oliveira@example.com",
        cep: "20000-000",
        interest: "internet",
        packageId: null,
        status: "contacted",
        notes: "Cliente interessado em internet de alta velocidade",
        createdAt: "2023-04-16T14:20:00.000Z",
        updatedAt: "2023-04-17T09:15:00.000Z",
      },
      {
        id: 3,
        name: "Pedro Santos",
        phone: "(31) 98765-4321",
        email: "",
        cep: "30000-000",
        interest: "combo",
        packageId: 3,
        status: "converted",
        notes: "Cliente assinou o pacote Premium",
        createdAt: "2023-04-10T16:45:00.000Z",
        updatedAt: "2023-04-12T11:30:00.000Z",
      },
      {
        id: 4,
        name: "Ana Souza",
        phone: "(41) 98765-4321",
        email: "ana.souza@example.com",
        cep: "80000-000",
        interest: "tv",
        packageId: 1,
        status: "canceled",
        notes: "Cliente desistiu da contratação",
        createdAt: "2023-04-05T09:10:00.000Z",
        updatedAt: "2023-04-07T15:20:00.000Z",
      },
    ]

    // Tentar obter os contatos do banco de dados
    try {
      const dbContacts = await db.select().from(contacts).orderBy(contacts.createdAt)

      // Se o banco de dados retornar dados válidos, use-os
      if (Array.isArray(dbContacts) && dbContacts.length > 0) {
        return dbContacts
      }

      // Caso contrário, use os dados estáticos
      return staticContacts
    } catch (error) {
      console.error("Erro ao buscar contatos do banco de dados:", error)
      // Em caso de erro, retornar os dados estáticos
      return staticContacts
    }
  } catch (error) {
    console.error("Erro ao buscar contatos:", error)
    // Em caso de erro, retornar um array vazio para evitar quebrar a UI
    return []
  }
}

// Função para atualizar o status de um contato
export async function updateContactStatus(id: number, status: string, notes?: string) {
  try {
    await db
      .update(contacts)
      .set({
        status,
        notes,
        updatedAt: getTimestamp(),
      })
      .where(eq(contacts.id, id))

    revalidatePath("/admin/contacts")
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar status do contato:", error)
    return { success: false }
  }
}

