"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import * as yup from "yup"
import { savePessoaJuridica } from "@/app/actions"

interface PessoaJuridicaFormProps {
  onSuccess?: () => void
  produto?: string
}

const validationSchema = yup.object().shape({
  telefone: yup.string().required("Telefone é obrigatório"),
  produto: yup.string().required("Pacote é obrigatório"),
  quantidade_pontos: yup.string().required("Quantidade de pontos é obrigatória"),
})

export function PessoaJuridicaForm({ onSuccess, produto }: PessoaJuridicaFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    telefone: "",
    produto: produto || "",
    quantidade_pontos: "",
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
      const result = await savePessoaJuridica({ ...formData, phone: formData.telefone, status: "pending" })
      if (result.success) {
        setFormData({ telefone: "", produto: produto || "", quantidade_pontos: "" })
        if (onSuccess) onSuccess()
        return true
      } else {
        toast({ title: "Erro", description: result.message, variant: "destructive" })
        return false
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) validationErrors[err.path] = err.message
        })
        setErrors(validationErrors)
        toast({ title: "Erro de validação", description: "Por favor, corrija os campos destacados.", variant: "destructive" })
      } else {
        toast({ title: "Erro", description: "Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.", variant: "destructive" })
      }
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let maskedValue = value
    if (name === 'telefone') {
      maskedValue = applyMask(value.replace(/\D/g, ''), '(99) 99999-9999')
    }
    setFormData((prev) => ({ ...prev, [name]: maskedValue }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="telefone">Telefone (C/DDD)*</Label>
        <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required className={errors.telefone ? "border-red-500" : ""} />
        {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="produto">Pacote*</Label>
        <Input id="produto" name="produto" value={formData.produto} onChange={handleChange} required className={errors.produto ? "border-red-500" : ""} />
        {errors.produto && <span className="text-red-500 text-sm">{errors.produto}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="quantidade_pontos">Quantidade de Pontos*</Label>
        <Input id="quantidade_pontos" name="quantidade_pontos" value={formData.quantidade_pontos} onChange={handleChange} required className={errors.quantidade_pontos ? "border-red-500" : ""} />
        {errors.quantidade_pontos && <span className="text-red-500 text-sm">{errors.quantidade_pontos}</span>}
      </div>
      <Button type="submit" className="w-full bg-[#E30613] hover:bg-[#c00511]" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar Cadastro"}
      </Button>
    </form>
  )
} 