"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getActiveFaqs } from "@/app/admin/actions"

export function FaqAccordion() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await getActiveFaqs()
        setFaqs(data)
      } catch (error) {
        console.error("Erro ao carregar FAQs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFaqs()
  }, [])

  if (isLoading) {
    return <div className="text-center py-4">Carregando perguntas frequentes...</div>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

