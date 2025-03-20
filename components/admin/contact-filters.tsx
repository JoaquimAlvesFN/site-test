"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface ContactFiltersProps {
  onFilterChange: (filters: ContactFilters) => void
}

export interface ContactFilters {
  name: string
  email: string
  phone: string
  status: string
}

export function ContactFilters({ onFilterChange }: ContactFiltersProps) {
  const [filters, setFilters] = useState<ContactFilters>({
    name: "",
    email: "",
    phone: "",
    status: "",
  })

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

