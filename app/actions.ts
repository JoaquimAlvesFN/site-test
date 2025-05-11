"use server"

import { db, Contact, getTimestamp } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { supabase } from "@/lib/supabase"

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
    await db.contact.create({
      data: {
        ...data,
        status: "pending",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      }
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
    // Adicionar log para depuração
    console.log("Iniciando busca de contatos");
    
    // Verificar se a tabela contact existe no banco antes de tentar buscar
    try {
      console.log("Buscando contatos");
      const contactsData = await db.contact.findMany({
        orderBy: { createdAt: 'desc' }
      });
      
      // Adicionar log para depuração do formato dos dados
      console.log(`Encontrados ${contactsData.length} contatos`);
      
      // Validar os dados retornados
      if (!Array.isArray(contactsData)) {
        console.error("Dados retornados não são um array:", contactsData);
        return [];
      }
      
      return contactsData;
    } catch (dbError) {
      // Erros específicos de banco de dados
      if (dbError instanceof Error && dbError.message.includes("no such table")) {
        console.error("Tabela de contatos não existe no banco:", dbError);
        return [];
      }
      
      // Outros erros de banco de dados
      throw dbError;
    }
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    // Retornar array vazio em caso de erro para evitar quebrar a UI
    return [];
  }
}

// Função para atualizar o status de um contato
export async function updateContactStatus(contactId: number, newStatus: string) {
  try {
    console.log(`Atualizando status do contato ${contactId} para ${newStatus}`);
    
    // Validar o status
    const validStatus = ["pending", "contacted", "converted", "canceled"];
    if (!validStatus.includes(newStatus)) {
      console.error(`Status inválido: ${newStatus}`);
      return { success: false, message: "Status inválido" };
    }
    
    // Atualizar no banco de dados
    await db.contact.update({
      where: { id: contactId },
      data: { 
        status: newStatus,
        updatedAt: getTimestamp() 
      }
    });
    
    console.log(`Status do contato ${contactId} atualizado com sucesso`);
    
    // Revalidar caminhos que mostram contatos
    revalidatePath("/admin/contacts");
    
    return { success: true, message: "Status atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar status do contato:", error);
    return { success: false, message: "Ocorreu um erro ao atualizar o status" };
  }
}

// Função para salvar dados de pessoa física
export async function savePessoaFisica(data: Contact) {
  try {
    if (!data.endereco || !data.cep || !data.email || !data.telefone || !data.cpf || !data.rg || !data.dataExpedicao || !data.orgao || !data.cargoCpf) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      }
    }
    // Salvar no banco de dados (ajuste para o seu ORM ou banco)
    // Salvar no Supabase
    const { error } = await supabase
      .from("Contact")
      .insert({
        ...data,
        phone: data.telefone,
        telefone: data.telefone,
        produto: data.produto || null,
      })

    if (error) {
      throw error
    }

    return {
      success: true,
      message: "Cadastro enviado com sucesso! Em breve entraremos em contato.",
    }
  } catch (error) {
    console.error("Erro ao salvar pessoa física:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao enviar seu cadastro. Por favor, tente novamente.",
    }
  }
}

