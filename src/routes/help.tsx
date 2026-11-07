import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Shipping, Returns & FAQ — Everwell Beauty" },
      { name: "description", content: "Free shipping over $40, 30-day returns, and answers to common questions." },
      { property: "og:title", content: "Shipping, Returns & FAQ — Everwell Beauty" },
      { property: "og:description", content: "Everything you need to know before you order." },
    ],
  }),
  component: Help,
});

const faqs = [
  ["How long does shipping take?", "Orders ship within 1–2 business days. Standard delivery usually arrives in 3–7 business days within the US."],
  ["How much is shipping?", "Shipping is free on orders over $40. Below that, standard shipping is a flat $4.95."],
  ["What is your return policy?", "If you're not happy, return unused items within 30 days of delivery for a full refund."],
  ["Is checkout secure?", "Yes. Payments are encrypted and we never store your card details."],
  ["Do you ship internationally?", "We currently ship within the US, with more countries coming soon."],
];

function Help() {
  return (
    <>
      <section className="bg-gradient-peach px-5 py-20 text-center">
        <p className="eyebrow">Here to help</p>
        <h1 className="mt-4 text-5xl md:text-6xl">Shipping, returns & FAQ</h1>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-20">
        <div className="divide-y border-y">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5" open={q === faqs[0]?.[0]}>
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl">
                {q}
                <span className="text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
