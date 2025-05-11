"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { savePessoaFisica } from "@/app/actions"
import * as yup from "yup"
import { useToast } from "@/hooks/use-toast"

interface PessoaFisicaFormProps {
  onSuccess?: () => void
  produto?: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  endereco: yup.string().required("Endereço é obrigatório"),
  cep: yup.string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-?\d{3}$/, "CEP inválido"),
  cnpj: yup.string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido")
    .nullable(),
  email: yup.string()
    .required("Email é obrigatório")
    .email("Email inválido"),
  telefone: yup.string()
    .required("Telefone é obrigatório")
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  cpf: yup.string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  rg: yup.string().required("RG é obrigatório"),
  dataExpedicao: yup.string()
    .required("Data de expedição é obrigatória")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida"),
  orgao: yup.string().required("Órgão é obrigatório"),
  cargoCpf: yup.string().required("Cargo é obrigatório"),
})

// Mask functions
const maskCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

const maskDate = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})\d+?$/, '$1')
}

export function PessoaFisicaForm({ onSuccess, produto }: PessoaFisicaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    endereco: "",
    cep: "",
    cnpj: "",
    email: "",
    telefone: "",
    cpf: "",
    rg: "",
    dataExpedicao: "",
    orgao: "",
    cargoCpf: "",
    produto: produto || "",
    name: "",
    phone: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      await validationSchema.validate(formData, { abortEarly: false })
      
      const result = await savePessoaFisica({ 
        ...formData, 
        produto: produto || formData.produto || "",
        status: "pending",
        phone: formData.telefone,
      })

      if (result.success) {
        setFormData({
          endereco: "",
          cep: "",
          cnpj: "",
          email: "",
          telefone: "",
          cpf: "",
          rg: "",
          dataExpedicao: "",
          orgao: "",
          cargoCpf: "",
          produto: produto || "",
          name: "",
          phone: "",
        })
        if (onSuccess) {
          onSuccess()
          return true
        }
      } else {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.log("Validation error:", error)
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })
        console.log("Setting validation errors:", validationErrors)
        setErrors(validationErrors)
        toast({
          title: "Erro de validação",
          description: "Por favor, corrija os campos destacados.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.",
          variant: "destructive",
        })
      }
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    let maskedValue = value

    // Apply masks based on field name
    switch (name) {
      case 'cep':
        maskedValue = maskCEP(value)
        break
      case 'cnpj':
        maskedValue = maskCNPJ(value)
        break
      case 'telefone':
        maskedValue = maskPhone(value)
        break
      case 'cpf':
        maskedValue = maskCPF(value)
        break
      case 'dataExpedicao':
        maskedValue = maskDate(value)
        break
    }

    setFormData((prev) => ({ ...prev, [name]: maskedValue }))
    
    try {
      await validationSchema.validateAt(name, { [name]: maskedValue })
      setErrors((prev) => ({ ...prev, [name]: "" }))
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: error.message }))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nome</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="endereco">Endereço de instalação</Label>
        <Input 
          id="endereco" 
          name="endereco" 
          value={formData.endereco} 
          onChange={handleChange} 
          required 
          className={errors.endereco ? "border-red-500" : ""}
        />
        {errors.endereco && <span className="text-red-500 text-sm">{errors.endereco}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cep">CEP</Label>
        <Input 
          id="cep" 
          name="cep" 
          value={formData.cep} 
          onChange={handleChange} 
          required 
          className={errors.cep ? "border-red-500" : ""}
          placeholder="00000-000"
        />
        {errors.cep && <span className="text-red-500 text-sm">{errors.cep}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input 
          id="cnpj" 
          name="cnpj" 
          value={formData.cnpj} 
          onChange={handleChange}
          className={errors.cnpj ? "border-red-500" : ""}
          placeholder="00.000.000/0000-00"
        />
        {errors.cnpj && <span className="text-red-500 text-sm">{errors.cnpj}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="telefone">Telefone</Label>
        <Input 
          id="telefone" 
          name="telefone" 
          value={formData.telefone} 
          onChange={handleChange} 
          required 
          className={errors.telefone ? "border-red-500" : ""}
          placeholder="(00) 00000-0000"
        />
        {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cpf">CPF</Label>
        <Input 
          id="cpf" 
          name="cpf" 
          value={formData.cpf} 
          onChange={handleChange} 
          required 
          className={errors.cpf ? "border-red-500" : ""}
          placeholder="000.000.000-00"
        />
        {errors.cpf && <span className="text-red-500 text-sm">{errors.cpf}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="rg">RG</Label>
        <Input 
          id="rg" 
          name="rg" 
          value={formData.rg} 
          onChange={handleChange} 
          required 
          className={errors.rg ? "border-red-500" : ""}
        />
        {errors.rg && <span className="text-red-500 text-sm">{errors.rg}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="dataExpedicao">Data Expedição</Label>
        <Input 
          id="dataExpedicao" 
          name="dataExpedicao" 
          value={formData.dataExpedicao} 
          onChange={handleChange} 
          required 
          className={errors.dataExpedicao ? "border-red-500" : ""}
          placeholder="00/00/0000"
        />
        {errors.dataExpedicao && <span className="text-red-500 text-sm">{errors.dataExpedicao}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="orgao">Órgão</Label>
        <Input 
          id="orgao" 
          name="orgao" 
          value={formData.orgao} 
          onChange={handleChange} 
          required 
          className={errors.orgao ? "border-red-500" : ""}
        />
        {errors.orgao && <span className="text-red-500 text-sm">{errors.orgao}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cargoCpf">Cargo do CPF Informado</Label>
        <Input 
          id="cargoCpf" 
          name="cargoCpf" 
          value={formData.cargoCpf} 
          onChange={handleChange} 
          required 
          className={errors.cargoCpf ? "border-red-500" : ""}
        />
        {errors.cargoCpf && <span className="text-red-500 text-sm">{errors.cargoCpf}</span>}
      </div>
      <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00511]" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
      </Button>
    </form>
  )
} 