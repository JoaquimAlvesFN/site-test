"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import * as yup from "yup"
import { savePessoaJuridica } from "@/app/actions"

interface PessoaJuridicaFormProps {
  onSuccess?: () => void
  produto?: string
}

const validationSchema = yup.object().shape({
  nome_fantasia: yup.string().required("Nome fantasia é obrigatório"),
  razao_social: yup.string().required("Razão social é obrigatória"),
  cnpj: yup.string().required("CNPJ é obrigatório"),
  telefone_comercial: yup.string().required("Telefone comercial é obrigatório"),
  telefone_celular: yup.string(),
  email_faturamento: yup.string().required("E-mail de faturamento é obrigatório").email("E-mail inválido"),
  cep: yup.string().required("CEP é obrigatório"),
  endereco: yup.string(),
  responsavel_nome: yup.string(),
  responsavel_cpf: yup.string().required("CPF é obrigatório"),
  responsavel_rg: yup.string().required("RG é obrigatório"),
  responsavel_data_emissao: yup.string(),
  responsavel_orgao: yup.string(),
  responsavel_nascimento: yup.string().required("Data de nascimento é obrigatória"),
  responsavel_cargo: yup.string(),
  responsavel_cep: yup.string().required("CEP é obrigatório"),
  responsavel_endereco: yup.string(),
  detalhes_contrato: yup.string(),
  quantidade_pontos: yup.string(),
  pergunta: yup.string(),
})

export function PessoaJuridicaForm({ onSuccess, produto }: PessoaJuridicaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    nome_fantasia: "",
    razao_social: "",
    cnpj: "",
    telefone_comercial: "",
    telefone_celular: "",
    email_faturamento: "",
    cep: "",
    endereco: "",
    responsavel_nome: "",
    responsavel_cpf: "",
    responsavel_rg: "",
    responsavel_data_emissao: "",
    responsavel_orgao: "",
    responsavel_nascimento: "",
    responsavel_cargo: "",
    responsavel_cep: "",
    responsavel_endereco: "",
    detalhes_contrato: "",
    quantidade_pontos: "",
    pergunta: "",
    produto: produto || "",
  })

  const applyMask = (value: string, mask: string) => {
    let maskedValue = ''
    let valueIndex = 0

    for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
      if (mask[i] === '9') {
        if (/\d/.test(value[valueIndex])) {
          maskedValue += value[valueIndex]
          valueIndex++
        }
      } else {
        maskedValue += mask[i]
        if (value[valueIndex] === mask[i]) {
          valueIndex++
        }
      }
    }

    return maskedValue
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      await validationSchema.validate(formData, { abortEarly: false })
      const result = await savePessoaJuridica({ ...formData, status: "pending" })
      
      if (result.success) {
        setFormData({
          nome_fantasia: "",
          razao_social: "",
          cnpj: "",
          telefone_comercial: "",
          telefone_celular: "",
          email_faturamento: "",
          cep: "",
          endereco: "",
          responsavel_nome: "",
          responsavel_cpf: "",
          responsavel_rg: "",
          responsavel_data_emissao: "",
          responsavel_orgao: "",
          responsavel_nascimento: "",
          responsavel_cargo: "",
          responsavel_cep: "",
          responsavel_endereco: "",
          detalhes_contrato: "",
          quantidade_pontos: "",
          pergunta: "",
          produto: produto || "",
        })
        if (onSuccess) onSuccess()
        return true
      } else {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message
        })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let maskedValue = value

    // Apply masks based on field type
    switch (name) {
      case 'cnpj':
        maskedValue = applyMask(value.replace(/\D/g, ''), '99.999.999/9999-99')
        break
      case 'telefone_comercial':
      case 'telefone_celular':
        maskedValue = applyMask(value.replace(/\D/g, ''), '(99) 99999-9999')
        break
      case 'responsavel_cpf':
        maskedValue = applyMask(value.replace(/\D/g, ''), '999.999.999-99')
        break
      case 'cep':
      case 'responsavel_cep':
        maskedValue = applyMask(value.replace(/\D/g, ''), '99999-999')
        break
      case 'responsavel_data_emissao':
      case 'responsavel_nascimento':
        maskedValue = applyMask(value.replace(/\D/g, ''), '99/99/9999')
        break
    }

    setFormData((prev) => ({ ...prev, [name]: maskedValue }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="nome_fantasia">Nome fantasia*</Label>
        <Input id="nome_fantasia" name="nome_fantasia" value={formData.nome_fantasia} onChange={handleChange} required className={errors.nome_fantasia ? "border-red-500" : ""} />
        {errors.nome_fantasia && <span className="text-red-500 text-sm">{errors.nome_fantasia}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="razao_social">Razão Social*</Label>
        <Input id="razao_social" name="razao_social" value={formData.razao_social} onChange={handleChange} required className={errors.razao_social ? "border-red-500" : ""} />
        {errors.razao_social && <span className="text-red-500 text-sm">{errors.razao_social}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cnpj">CNPJ*</Label>
        <Input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} required className={errors.cnpj ? "border-red-500" : ""} />
        {errors.cnpj && <span className="text-red-500 text-sm">{errors.cnpj}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="telefone_comercial">Telefone Comercial (C/DDD)*</Label>
        <Input id="telefone_comercial" name="telefone_comercial" value={formData.telefone_comercial} onChange={handleChange} required className={errors.telefone_comercial ? "border-red-500" : ""} />
        {errors.telefone_comercial && <span className="text-red-500 text-sm">{errors.telefone_comercial}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="telefone_celular">Telefone Celular (C/DDD)</Label>
        <Input id="telefone_celular" name="telefone_celular" value={formData.telefone_celular} onChange={handleChange} className={errors.telefone_celular ? "border-red-500" : ""} />
        {errors.telefone_celular && <span className="text-red-500 text-sm">{errors.telefone_celular}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email_faturamento">E-mail de faturamento*</Label>
        <Input id="email_faturamento" name="email_faturamento" value={formData.email_faturamento} onChange={handleChange} required className={errors.email_faturamento ? "border-red-500" : ""} />
        {errors.email_faturamento && <span className="text-red-500 text-sm">{errors.email_faturamento}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="cep">CEP*</Label>
        <Input id="cep" name="cep" value={formData.cep} onChange={handleChange} required className={errors.cep ? "border-red-500" : ""} />
        {errors.cep && <span className="text-red-500 text-sm">{errors.cep}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="endereco">Endereço</Label>
        <Textarea id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} className={errors.endereco ? "border-red-500" : ""} />
        {errors.endereco && <span className="text-red-500 text-sm">{errors.endereco}</span>}
      </div>
      <div className="font-bold">Dados do Responsável pelo empreendimento</div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_nome">Nome completo</Label>
        <Input id="responsavel_nome" name="responsavel_nome" value={formData.responsavel_nome} onChange={handleChange} className={errors.responsavel_nome ? "border-red-500" : ""} />
        {errors.responsavel_nome && <span className="text-red-500 text-sm">{errors.responsavel_nome}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_cpf">CPF*</Label>
        <Input id="responsavel_cpf" name="responsavel_cpf" value={formData.responsavel_cpf} onChange={handleChange} required className={errors.responsavel_cpf ? "border-red-500" : ""} />
        {errors.responsavel_cpf && <span className="text-red-500 text-sm">{errors.responsavel_cpf}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_rg">RG*</Label>
        <Input id="responsavel_rg" name="responsavel_rg" value={formData.responsavel_rg} onChange={handleChange} required className={errors.responsavel_rg ? "border-red-500" : ""} />
        {errors.responsavel_rg && <span className="text-red-500 text-sm">{errors.responsavel_rg}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_data_emissao">Data de emissão</Label>
        <Input id="responsavel_data_emissao" name="responsavel_data_emissao" value={formData.responsavel_data_emissao} onChange={handleChange} className={errors.responsavel_data_emissao ? "border-red-500" : ""} />
        {errors.responsavel_data_emissao && <span className="text-red-500 text-sm">{errors.responsavel_data_emissao}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_orgao">Órgão emissor + Estado</Label>
        <Input id="responsavel_orgao" name="responsavel_orgao" value={formData.responsavel_orgao} onChange={handleChange} className={errors.responsavel_orgao ? "border-red-500" : ""} />
        {errors.responsavel_orgao && <span className="text-red-500 text-sm">{errors.responsavel_orgao}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_nascimento">Data de nascimento*</Label>
        <Input id="responsavel_nascimento" name="responsavel_nascimento" value={formData.responsavel_nascimento} onChange={handleChange} required className={errors.responsavel_nascimento ? "border-red-500" : ""} />
        {errors.responsavel_nascimento && <span className="text-red-500 text-sm">{errors.responsavel_nascimento}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_cargo">Cargo na empresa</Label>
        <Input id="responsavel_cargo" name="responsavel_cargo" value={formData.responsavel_cargo} onChange={handleChange} className={errors.responsavel_cargo ? "border-red-500" : ""} />
        {errors.responsavel_cargo && <span className="text-red-500 text-sm">{errors.responsavel_cargo}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_cep">CEP Responsável</Label>
        <Input id="responsavel_cep" name="responsavel_cep" value={formData.responsavel_cep} onChange={handleChange} required className={errors.responsavel_cep ? "border-red-500" : ""} />
        {errors.responsavel_cep && <span className="text-red-500 text-sm">{errors.responsavel_cep}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="responsavel_endereco">Endereço</Label>
        <Textarea id="responsavel_endereco" name="responsavel_endereco" value={formData.responsavel_endereco} onChange={handleChange} className={errors.responsavel_endereco ? "border-red-500" : ""} />
        {errors.responsavel_endereco && <span className="text-red-500 text-sm">{errors.responsavel_endereco}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="detalhes_contrato">Detalhes do contrato (DTH Hospitality)</Label>
        <Textarea id="detalhes_contrato" name="detalhes_contrato" value={formData.detalhes_contrato} onChange={handleChange} className={errors.detalhes_contrato ? "border-red-500" : ""} />
        {errors.detalhes_contrato && <span className="text-red-500 text-sm">{errors.detalhes_contrato}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="quantidade_pontos">Quantidade de Pontos (total)</Label>
        <Input id="quantidade_pontos" name="quantidade_pontos" value={formData.quantidade_pontos} onChange={handleChange} className={errors.quantidade_pontos ? "border-red-500" : ""} />
        {errors.quantidade_pontos && <span className="text-red-500 text-sm">{errors.quantidade_pontos}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="pergunta">Pergunta</Label>
        <Input id="pergunta" name="pergunta" value={formData.pergunta} onChange={handleChange} className={errors.pergunta ? "border-red-500" : ""} />
        {errors.pergunta && <span className="text-red-500 text-sm">{errors.pergunta}</span>}
      </div>
      <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00511]" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
      </Button>
    </form>
  )
} 