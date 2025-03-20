"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContacts } from "@/app/actions"
import { ContactStatusBadge } from "@/components/admin/contact-status-badge"
import { ContactStatusSelect } from "@/components/admin/contact-status-select"
import { ContactFilters, type ContactFilters as ContactFiltersType } from "@/components/admin/contact-filters"

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // Simulando a chamada de requireAuth() que seria executada no servidor
        // Na versão cliente, isso é apenas para manter a estrutura similar

        const contactsData = await getContacts()
        setContacts(contactsData)
        setFilteredContacts(contactsData)
      } catch (err) {
        console.error("Erro ao buscar contatos:", err)
        setError("Ocorreu um erro ao carregar os contatos. Por favor, tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const handleFilterChange = (filters: ContactFiltersType) => {
    const filtered = contacts.filter((contact) => {
      // Filtrar por nome (case insensitive)
      if (filters.name && !contact.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }

      // Filtrar por email (case insensitive)
      if (filters.email && contact.email) {
        if (!contact.email.toLowerCase().includes(filters.email.toLowerCase())) {
          return false
        }
      } else if (filters.email && !contact.email) {
        return false
      }

      // Filtrar por telefone
      if (filters.phone && !contact.phone.includes(filters.phone)) {
        return false
      }

      // Filtrar por status
      if (filters.status && contact.status !== filters.status) {
        return false
      }

      return true
    })

    setFilteredContacts(filtered)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
            <p className="text-muted-foreground">Carregando contatos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Solicitações de Contato</h1>
          <p className="text-muted-foreground">Gerencie as solicitações de contato recebidas pelo site</p>
        </div>
      </div>

      <ContactFilters onFilterChange={handleFilterChange} />

      <Card>
        <CardHeader>
          <CardTitle>
            Solicitações Recentes
            {contacts.length !== filteredContacts.length && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                (Mostrando {filteredContacts.length} de {contacts.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-muted-foreground">
                      {contacts.length === 0
                        ? "Nenhuma solicitação de contato encontrada."
                        : "Nenhum contato corresponde aos filtros aplicados."}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
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
                      <td className="py-3 px-4">{new Date(contact.createdAt).toLocaleDateString("pt-BR")}</td>
                      <td className="py-3 px-4">
                        <ContactStatusBadge status={contact.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <ContactStatusSelect
                          contactId={contact.id}
                          currentStatus={contact.status}
                          onStatusChange={(newStatus) => {
                            // Atualiza o status no array local para refletir a mudança imediatamente
                            const updatedContacts = contacts.map((c) =>
                              c.id === contact.id ? { ...c, status: newStatus } : c,
                            )
                            setContacts(updatedContacts)

                            // Reaplica os filtros aos contatos atualizados
                            handleFilterChange({
                              name: "",
                              email: "",
                              phone: "",
                              status: "",
                            })
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

