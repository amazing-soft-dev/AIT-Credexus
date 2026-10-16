import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { faqs } from "~/data/content";

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-3">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const faqLd = (items = faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
