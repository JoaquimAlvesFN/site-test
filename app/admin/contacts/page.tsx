"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContacts } from "@/app/actions"
import { ContactStatusBadge } from "@/components/admin/contact-status-badge"
import { ContactStatusSelect } from "@/components/admin/contact-status-select"
import { ContactFilters, type ContactFilters as ContactFiltersType } from "@/components/admin/contact-filters"

// Adicionar uma interface simples para Contact
interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  cep: string;
  interest: string;
  status: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<ContactFiltersType>({
    name: "",
    email: "",
    phone: "",
    status: "pending",
  })

  // Função simples e segura para buscar dados
  async function fetchData() {
    setIsLoading(true);
    try {
      const data = await getContacts();
      
      // Verificar se temos um array válido com dados
      if (Array.isArray(data)) {
        setContacts(data);
        
        // Verificar se há dados para filtrar
        if (data.length > 0) {
          // Filtrar inicialmente apenas os pendentes
          const pendingOnly = data.filter(c => c && c.status === "pending");
          setFilteredContacts(pendingOnly);
        } else {
          // Banco de dados vazio - não há contatos para mostrar
          setFilteredContacts([]);
          console.log("Banco de dados vazio - não há contatos cadastrados");
        }
      } else {
        throw new Error("Dados inválidos recebidos da API");
      }
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
      setError("Não foi possível carregar os contatos. Tente novamente mais tarde.");
      setContacts([]);
      setFilteredContacts([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Carregar dados apenas uma vez ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  // Função simplificada de filtro
  const handleFilterChange = (filters: ContactFiltersType) => {
    setActiveFilters(filters);
    
    if (!contacts.length) {
      setFilteredContacts([]);
      return;
    }
    
    const filtered = contacts.filter(contact => {
      // Skip invalid contacts
      if (!contact) return false;
      
      // Nome
      if (filters.name && !String(contact.name).toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      
      // Email
      if (filters.email) {
        if (!contact.email) return false;
        if (!String(contact.email).toLowerCase().includes(filters.email.toLowerCase())) {
          return false;
        }
      }
      
      // Telefone
      if (filters.phone && !String(contact.phone).includes(filters.phone)) {
        return false;
      }
      
      // Status
      if (filters.status && contact.status !== filters.status) {
        return false;
      }
      
      return true;
    });
    
    setFilteredContacts(filtered);
  };

  // Contadores de status
  const countsByStatus = {
    total: contacts.length,
    pending: contacts.filter(c => c && c.status === "pending").length,
    contacted: contacts.filter(c => c && c.status === "contacted").length,
    converted: contacts.filter(c => c && c.status === "converted").length,
    canceled: contacts.filter(c => c && c.status === "canceled").length
  };

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
        <p>Carregando dados, aguarde por favor...</p>
      </div>
    );
  }

  // Tela de erro
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // Caso especial: não há contatos cadastrados
  if (contacts.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
          <p className="text-muted-foreground">Gerencie as solicitações de contato recebidas pelo site</p>
        </div>
        
        <Card className="border-dashed border-2">
          <CardContent className="pt-6 pb-6">
            <div className="text-center py-8">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Nenhuma solicitação de contato</h3>
              <p className="text-gray-500 mb-4">
                Ainda não há solicitações de contato cadastradas. <br />
                As solicitações aparecerão aqui quando os clientes preencherem o formulário no site.
              </p>
              <a 
                href="/" 
                target="_blank" 
                className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center"
              >
                <span>Ver o formulário de contato</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Renderização normal
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
          <p className="text-muted-foreground">Gerencie as solicitações de contato recebidas pelo site</p>
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm mt-4 md:mt-0">
          <div className="bg-gray-100 px-3 py-1 rounded-full">
            Total: <span className="font-bold">{countsByStatus.total}</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${activeFilters.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100"}`}>
            Pendentes: <span className="font-bold">{countsByStatus.pending}</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${activeFilters.status === "contacted" ? "bg-blue-100 text-blue-800" : "bg-gray-100"}`}>
            Contatados: <span className="font-bold">{countsByStatus.contacted}</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${activeFilters.status === "converted" ? "bg-green-100 text-green-800" : "bg-gray-100"}`}>
            Convertidos: <span className="font-bold">{countsByStatus.converted}</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${activeFilters.status === "canceled" ? "bg-red-100 text-red-800" : "bg-gray-100"}`}>
            Cancelados: <span className="font-bold">{countsByStatus.canceled}</span>
          </div>
        </div>
      </div>

      <ContactFilters 
        onFilterChange={handleFilterChange} 
        defaultStatus="pending"
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Solicitações
            {activeFilters.status ? (
              <span className="ml-2 text-base font-medium">
                {activeFilters.status === "pending" && "Pendentes"}
                {activeFilters.status === "contacted" && "Contatadas"}
                {activeFilters.status === "converted" && "Convertidas"}
                {activeFilters.status === "canceled" && "Canceladas"}
              </span>
            ) : (
              <span className="ml-2 text-base font-medium">
                (Todas)
              </span>
            )}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              (Mostrando {filteredContacts.length} de {contacts.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredContacts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {contacts.length === 0
                ? "Nenhuma solicitação de contato encontrada."
                : "Nenhum contato corresponde aos filtros aplicados."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Nome</th>
                    <th className="text-left py-3 px-4">Telefone</th>
                    <th className="text-left py-3 px-4">E-mail</th>
                    <th className="text-left py-3 px-4">CEP</th>
                    <th className="text-left py-3 px-4">Interesse</th>
                    <th className="text-left py-3 px-4">Data</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4">{contact.name}</td>
                      <td className="py-3 px-4">{contact.phone}</td>
                      <td className="py-3 px-4">{contact.email || "-"}</td>
                      <td className="py-3 px-4">{contact.cep}</td>
                      <td className="py-3 px-4">
                        {contact.interest === "tv"
                          ? "TV por Assinatura"
                          : contact.interest === "internet"
                            ? "Internet"
                            : "Combo (TV + Internet)"}
                      </td>
                      <td className="py-3 px-4">
                        {(() => {
                          try {
                            return new Date(contact.createdAt).toLocaleDateString("pt-BR");
                          } catch (e) {
                            return "Data inválida";
                          }
                        })()}
                      </td>
                      <td className="py-3 px-4">
                        <ContactStatusBadge status={contact.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <ContactStatusSelect
                          contactId={contact.id}
                          currentStatus={contact.status}
                          onStatusChange={(newStatus) => {
                            try {
                              // Atualiza localmente
                              const updatedContacts = contacts.map(c => 
                                c.id === contact.id ? {...c, status: newStatus} : c
                              );
                              
                              setContacts(updatedContacts);
                              
                              // Atualiza a visualização filtrada
                              if (activeFilters.status && activeFilters.status !== newStatus) {
                                setFilteredContacts(prev => prev.filter(c => c.id !== contact.id));
                              } else {
                                handleFilterChange(activeFilters);
                              }
                            } catch (error) {
                              console.error("Erro ao atualizar status:", error);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

