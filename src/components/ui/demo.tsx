"use client"

import * as React from "react"
import { ProductCard, ProductVariantGroup } from "@/components/ui/product-card"
export { words } from "@/components/ui/hero-words"

/** How long a choice holds a tour before it carries on. */
const RESUME_MS = 1800

/** True until `RESUME_MS` after the last `hold()`, for tours with their own state. */
function useHold() {
  const [held, setHeld] = React.useState(false)
  const timer = React.useRef(0)
  React.useEffect(() => () => window.clearTimeout(timer.current), [])
  const hold = React.useCallback(() => {
    setHeld(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setHeld(false), RESUME_MS)
  }, [])
  return [held, hold] as const
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Calls `callback` every `ms`, for demos that replay on their own. Reduced motion never does. */
function useEvery(callback: () => void, ms: number) {
  const latest = React.useRef(callback)
  React.useEffect(() => {
    latest.current = callback
  })
  React.useEffect(() => {
    if (reducedMotion()) return
    const id = window.setInterval(() => latest.current(), ms)
    return () => window.clearInterval(id)
  }, [ms])
}

/**
 * The tour, one beat at a time: pick a size on the brogue, add it to the cart, then mark the
 * brogue and the jacket to compare. Each beat is a full snapshot, so the loop never drifts.
 */
const BEATS = [
  { shoe: undefined, jacket: "M", cart: "idle", compare: [] as string[] },
  { shoe: "42", jacket: "M", cart: "idle", compare: [] },
  { shoe: "42", jacket: "M", cart: "adding", compare: [] },
  { shoe: "42", jacket: "M", cart: "added", compare: [] },
  { shoe: "42", jacket: "M", cart: "added", compare: ["shoe"] },
  { shoe: "42", jacket: "M", cart: "added", compare: ["shoe", "jacket"] },
  { shoe: "42", jacket: "M", cart: "added", compare: ["shoe", "jacket"] },
] as const

const BEAT_MS = 1100

const FIT_CSS = "html,body{overflow:hidden}[data-fit-small] [data-fit-hide]{display:none!important}"

/**
 * 21st shows a demo in a small frame: about 674 by 421 on a component page, 358 by 224 on a
 * phone and 245 by 139 on a profile card. A demo taller than its frame gets scrollbars, which
 * render white on dark pages. FitFrame fills the frame exactly instead.
 *
 * - "scale": the content shrinks until it fits, centered. For visuals such as orbs.
 * - "crop": the content stays at full size from the top and fades out at the bottom. For text
 *   that streams in, where a changing scale would make the page breathe.
 *
 * `minWidth` lays out a wide demo (a table, a two column panel) at that width and scales it down
 * to the frame, instead of letting it collapse to a narrow layout. The frame centers it, so it
 * shrinks evenly on both sides.
 *
 * Anything marked `data-fit-hide` (state buttons, the chatcn.dev line) drops out in frames
 * shorter than `hideBelow`, so a profile card shows the visual alone.
 */
function FitFrame({
  children,
  mode = "scale",
  hideBelow = 360,
  minWidth,
}: {
  children: React.ReactNode
  mode?: "scale" | "crop"
  hideBelow?: number
  minWidth?: string
}) {
  const content = React.useRef<HTMLDivElement>(null)
  const [cropped, setCropped] = React.useState(false)

  React.useLayoutEffect(() => {
    const el = content.current
    if (!el) return
    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      el.toggleAttribute("data-fit-small", vh < hideBelow)
      // Layout sizes ignore the transform, so measuring never feeds back.
      const w = Math.max(el.offsetWidth, el.scrollWidth)
      const h = Math.max(el.offsetHeight, el.scrollHeight)
      const scale = mode === "scale" ? Math.min(1, vw / w, vh / h) : 1
      el.style.transform = scale < 1 ? `scale(${scale})` : ""
      setCropped(mode === "crop" && h > vh + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    // Content that changes inside a fixed width box (a headline that cycles words) never resizes
    // the box itself, so changes below it measure again on the next frame.
    let frame = 0
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    })
    mutations.observe(el, { subtree: true, childList: true, characterData: true })
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      mutations.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", measure)
    }
  }, [mode, hideBelow])

  const fade = "linear-gradient(to bottom, #000 calc(100% - 40px), transparent)"
  return (
    <div
      className="flex w-full justify-center overflow-hidden"
      style={{
        height: "100dvh",
        alignItems: mode === "crop" ? "flex-start" : "center",
        maskImage: cropped ? fade : undefined,
        WebkitMaskImage: cropped ? fade : undefined,
      }}
    >
      <style>{FIT_CSS}</style>
      <div
        ref={content}
        className="w-full shrink-0"
        style={{ transformOrigin: mode === "crop" ? "top center" : "center", minWidth }}
      >
        {children}
      </div>
    </div>
  )
}

// Unsplash 1560343090, 320 x 240, inline so the 21st preview needs no image host.
const pcShoe = {
  alt: "A moss green suede brogue on a pale pink block",
  width: 320,
  height: 240,
  src: "data:image/webp;base64,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",
}

const shoeSizes: ProductVariantGroup = {
  name: "Size (EU)",
  options: ["40", "41", "42", "43", "44"].map((v) => ({ value: v, label: v, available: v !== "40" })),
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Unsplash 1551028719, 320 x 240, inline so the 21st preview needs no image host.
const pcJacket = {
  alt: "A black leather jacket on a hanger over white sheets",
  width: 320,
  height: 240,
  src: "data:image/webp;base64,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",
}

const jacketSizes: ProductVariantGroup = {
  name: "Size",
  options: ["S", "M", "L", "XL"].map((v) => ({ value: v, label: v, available: v !== "XL" })),
}

// Unsplash 1553062407, 320 x 240, inline so the 21st preview needs no image host.
const pcPack = {
  alt: "A navy backpack standing on a white floor",
  width: 320,
  height: 240,
  src: "data:image/webp;base64,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",
}

/** The line under each 21st demo that points back to the kit. */
function MoreOn({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <p data-fit-hide className="text-[0.75rem]/[1rem] text-(color:--chatcn-fg-faint) text-center text-balance">
      {children}{" "}
      <a
        href={`https://chatcn.dev/docs/components/${slug}`}
        target="_blank"
        rel="noopener"
        className="text-(color:--chatcn-fg-subtle) hover:text-(color:--chatcn-fg) underline underline-offset-2"
      >
        chatcn.dev
      </a>
    </p>
  )
}

/**
 * Three products an assistant suggests for a weekend away, as shopping cards with photo, price,
 * rating, variants, stock and delivery. The tour picks a size, adds the brogue to the cart and
 * marks two items to compare, then starts over. Click anything and the tour steps aside.
 */
export default function ProductCardPreview() {
  const [beat, setBeat] = React.useState(0)
  const [held, hold] = useHold()
  const [mine, setMine] = React.useState<null | {
    shoe?: string
    jacket?: string
    compare: string[]
  }>(null)

  useEvery(() => {
    if (held || mine) return
    setBeat((b) => (b + 1) % BEATS.length)
  }, BEAT_MS)

  const tour = BEATS[beat]!
  const state = mine ?? { shoe: tour.shoe as string | undefined, jacket: tour.jacket as string, compare: [...tour.compare] }
  /** The first click takes over from the tour, starting from what it showed. */
  const take = () => {
    hold()
    return mine ?? state
  }
  const compareToggle = (id: string) => (on: boolean) => {
    const s = take()
    setMine({ ...s, compare: on ? [...s.compare, id] : s.compare.filter((x) => x !== id) })
  }

  return (
    <FitFrame minWidth="50rem">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
        <div className="grid w-full max-w-4xl grid-cols-3 gap-4">
          <ProductCard
            title="Harlow suede brogue, Goodyear welted"
            merchant="Fieldhouse Shoemakers"
            image={pcShoe.src}
            imageAlt={pcShoe.alt}
            badge="Best match"
            price={140}
            salePrice={112}
            rating={4.6}
            reviewCount={2140}
            variants={[shoeSizes]}
            selection={state.shoe ? { "Size (EU)": state.shoe } : {}}
            onSelectionChange={(next) => setMine({ ...take(), shoe: next["Size (EU)"] })}
            stock="in-stock"
            shipping="Free delivery Thu, Oct 29"
            cartState={mine ? undefined : (tour.cart as "idle" | "adding" | "added")}
            onAddToCart={() => {
              setMine(take())
              return wait(900)
            }}
            compared={state.compare.includes("shoe")}
            onComparedChange={compareToggle("shoe")}
          />
          <ProductCard
            title="Ridgeway leather biker jacket"
            merchant="Northbank Outfitters"
            image={pcJacket.src}
            imageAlt={pcJacket.alt}
            price={129}
            rating={4.3}
            reviewCount={486}
            variants={[jacketSizes]}
            selection={state.jacket ? { Size: state.jacket } : {}}
            onSelectionChange={(next) => setMine({ ...take(), jacket: next.Size })}
            stock="low-stock"
            stockCount={3}
            shipping="Arrives Mon, Nov 2"
            onAddToCart={() => {
              setMine(take())
              return wait(900)
            }}
            compared={state.compare.includes("jacket")}
            onComparedChange={compareToggle("jacket")}
          />
          <ProductCard
            title="Daypack 22 L, recycled ripstop"
            merchant="Alto Outdoor Supply"
            image={pcPack.src}
            imageAlt={pcPack.alt}
            price={98}
            rating={4.8}
            reviewCount={12890}
            stock="preorder"
            shipping="Ships Dec 2"
            onAddToCart={() => {
              setMine(take())
              return wait(900)
            }}
            compared={state.compare.includes("pack")}
            onComparedChange={compareToggle("pack")}
          />
        </div>
        <MoreOn slug="product-card">Products an assistant suggests, with price, rating and buy. On</MoreOn>
      </div>
    </FitFrame>
  )
}
