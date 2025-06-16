"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface Contact {
  id: number;
  name: string;
  endereco: string;
  cep: string;
  cnpj?: string | null;
  email: string;
  telefone: string;
  phone: string;
  cpf: string;
  rg: string;
  dataExpedicao: string;
  orgao: string;
  cargoCpf: string;
  produto?: string | null;
  interest?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date | null;
  packageId?: number | null;
  type: 'individual' | 'company';
  email_faturamento?: string | null;
}

interface ContactDetailsModalProps {
  contact: Contact;
}

export function ContactDetailsModal({ contact }: ContactDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver detalhes</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Contato</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Informações Básicas</h3>
            <div>
              <p className="text-sm text-muted-foreground">Nome/Razão Social</p>
              <p>{contact.type === 'company' ? contact.cnpj : contact.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo</p>
              <p>{contact.type === 'company' ? 'Pessoa Jurídica' : 'Pessoa Física'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{contact.type === 'company' ? 'CNPJ' : 'CPF'}</p>
              <p>{contact.type === 'company' ? contact.cnpj : contact.cpf}</p>
            </div>
            {contact.type === 'individual' && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">RG</p>
                  <p>{contact.rg}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Expedição</p>
                  <p>{contact.dataExpedicao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Órgão</p>
                  <p>{contact.orgao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cargo</p>
                  <p>{contact.cargoCpf}</p>
                </div>
              </>
            )}
            {contact.type === 'company' && contact.email_faturamento && (
              <div>
                <p className="text-sm text-muted-foreground">E-mail de Faturamento</p>
                <p>{contact.email_faturamento}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Contato</h3>
            <div>
              <p className="text-sm text-muted-foreground">E-mail</p>
              <p>{contact.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p>{contact.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereço</p>
              <p>{contact.endereco}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CEP</p>
              <p>{contact.cep}</p>
            </div>
          </div>
          <div className="space-y-2 col-span-2">
            <h3 className="font-semibold">Informações Adicionais</h3>
            <div>
              <p className="text-sm text-muted-foreground">Produto</p>
              <p>{contact.produto || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interesse</p>
              <p>{contact.interest || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Observações</p>
              <p>{contact.notes || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Cadastro</p>
              <p>{new Date(contact.createdAt).toLocaleDateString('pt-BR')}</p>
            </div>
            {contact.updatedAt && (
              <div>
                <p className="text-sm text-muted-foreground">Última Atualização</p>
                <p>{new Date(contact.updatedAt).toLocaleDateString('pt-BR')}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 