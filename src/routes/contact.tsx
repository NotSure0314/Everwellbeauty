import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Everwell Beauty" },
      { name: "description", content: "Questions, reviews, or a little hello — we'd love to hear from you." },
      { property: "og:title", content: "Contact — Everwell Beauty" },
      { property: "og:description", content: "Get in touch with the Everwell Beauty team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
      <div>
        <p className="eyebrow">Say hello</p>
        <h1 className="mt-4 text-5xl">We'd love to hear from you</h1>
        <p className="mt-5 text-lg text-muted-foreground">A question about your order, a review, or just a kind word — every message gets a real reply.</p>
        <div className="mt-8 space-y-4">
          <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> hello@everwellbeauty.com</p>
          <p className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /> Mon–Fri, 9am–5pm CT · replies within 1 business day</p>
        </div>
      </div>
      <div className="rounded-[2rem] bg-blush p-8">
        {sent ? (
          <p className="py-16 text-center font-serif text-3xl">Thank you, lovely. We'll be in touch soon.</p>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input className="field" required placeholder="Your name" aria-label="Name" />
            <input className="field" type="email" required placeholder="Email address" aria-label="Email" />
            <textarea className="field min-h-36 rounded-2xl" required placeholder="Your message" aria-label="Message" />
            <button className="btn-primary w-full">Send message</button>
          </form>
        )}
      </div>
    </section>
  );
}
