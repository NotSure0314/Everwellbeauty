import { createFileRoute, Link } from "@tanstack/react-router";
import curls from "@/assets/curls-lifestyle.jpg";
import { Reveal } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Everwell Beauty" },
      { name: "description", content: "Everwell Beauty was created to turn everyday haircare into a calm, confidence-filled ritual." },
      { property: "og:title", content: "Our Story — Everwell Beauty" },
      { property: "og:description", content: "Why we believe haircare should feel like a gentle ritual." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-gradient-soft px-5 py-24 text-center">
        <p className="eyebrow">Our story</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl leading-tight md:text-6xl">Made for the woman who deserves a moment for herself</h1>
      </section>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <Reveal>
          <img src={curls} alt="Woman smiling in soft morning light" width={1024} height={1024} loading="lazy" className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
        </Reveal>
        <Reveal delay={150} className="space-y-5 text-lg text-muted-foreground">
          <p>Everwell began with a simple wish: that caring for your hair could feel less like a chore and more like a breath of calm.</p>
          <p>We design small, thoughtful tools — soft silk, smooth rollerballs, nothing harsh — that fit gently into your evenings and mornings.</p>
          <p>We'll never promise miracles. We'll simply help you slow down, feel good, and remember that you were beautiful all along.</p>
          <Link to="/shop" className="btn-primary">Discover the ritual</Link>
        </Reveal>
      </section>
      <section className="bg-cream px-5 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3">
          {[
            ["Gentle", "Soft materials that treat your hair kindly."],
            ["Simple", "Easy rituals that fit real life."],
            ["Honest", "No exaggerated claims — just tools we love."],
          ].map(([t, b]) => (
            <div key={t}>
              <h2 className="text-3xl">{t}</h2>
              <p className="mt-2 text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
