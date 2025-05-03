"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useQuery } from "@tanstack/react-query"
import { supabaseQueries } from "@/lib/supabase-queries"

export function FaqAccordion() {
  const { data: faqs, isLoading } = useQuery(supabaseQueries.getFaqs)

  if (isLoading) {
    return <div className="text-center py-4">Carregando perguntas frequentes...</div>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs?.map((faq) => (
        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

