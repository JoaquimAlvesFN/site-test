"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface ContactFiltersProps {
  onFilterChange: (filters: ContactFilters) => void
  defaultStatus?: string
}

export interface ContactFilters {
  name: string
  email: string
  phone: string
  cpf: string
  cnpj: string
  status: string
}

export function ContactFilters({ onFilterChange, defaultStatus = "pending" }: ContactFiltersProps) {
  const [filters, setFilters] = useState<ContactFilters>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cnpj: "",
    status: defaultStatus,
  })

  // Aplicar o filtro inicial ao montar o componente
  useEffect(() => {
    // Aplicar o filtro inicial somente se for passado explicitamente
    if (defaultStatus) {
      onFilterChange(filters);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (field: keyof ContactFilters, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      cnpj: "",
      status: "",
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name-filter">Nome</Label>
            <Input
              id="name-filter"
              placeholder="Filtrar por nome"
              value={filters.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-filter">Email</Label>
            <Input
              id="email-filter"
              placeholder="Filtrar por email"
              value={filters.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-filter">Telefone</Label>
            <Input
              id="phone-filter"
              placeholder="Filtrar por telefone"
              value={filters.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf-filter">CPF</Label>
            <Input
              id="cpf-filter"
              placeholder="Filtrar por CPF"
              value={filters.cpf}
              onChange={(e) => handleChange("cpf", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj-filter">CNPJ</Label>
            <Input
              id="cnpj-filter"
              placeholder="Filtrar por CNPJ"
              value={filters.cnpj}
              onChange={(e) => handleChange("cnpj", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="contacted">Contatado</SelectItem>
                <SelectItem value="converted">Convertido</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            disabled={!Object.values(filters).some((v) => v !== "")}
          >
            <X className="h-4 w-4 mr-1" /> Limpar Filtros
          </Button>
          <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
            <Search className="h-4 w-4 mr-1" /> Filtrar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

