"use client"

// From chatcn, chat, voice and agent UI for shadcn: https://chatcn.dev

import * as React from "react"
import { forwardRef, createElement, type SVGAttributes, type ForwardRefExoticComponent, type RefAttributes } from "react"
import { cn } from "@/lib/utils"

/** chatcn theme variables and utilities this file uses, light and dark. */
const CHATCN_CSS = ":root{--chatcn-accent:var(--chatcn-gray-1000);--chatcn-accent-fg:var(--chatcn-bg);--chatcn-alpha-200:oklch(0 0 0 / 0.05);--chatcn-alpha-300:oklch(0 0 0 / 0.08);--chatcn-amber:oklch(0.555 0.125 60);--chatcn-bg:oklch(1 0 0);--chatcn-blue:oklch(0.550 0.180 258);--chatcn-border:var(--chatcn-gray-400);--chatcn-border-hover:var(--chatcn-gray-500);--chatcn-border-strong:var(--chatcn-gray-600);--chatcn-card:oklch(1 0 0);--chatcn-ease-out:cubic-bezier(0.23, 1, 0.32, 1);--chatcn-ease-standard:ease;--chatcn-fg:var(--chatcn-gray-1000);--chatcn-fg-faint:var(--chatcn-gray-700);--chatcn-fg-muted:var(--chatcn-gray-900);--chatcn-fg-subtle:var(--chatcn-gray-800);--chatcn-fill:var(--chatcn-gray-100);--chatcn-fill-active:var(--chatcn-gray-300);--chatcn-fill-hover:var(--chatcn-gray-200);--chatcn-gray-100:oklch(0.970 0 0);--chatcn-gray-1000:oklch(0.145 0 0);--chatcn-gray-200:oklch(0.950 0 0);--chatcn-gray-300:oklch(0.930 0 0);--chatcn-gray-400:oklch(0.910 0 0);--chatcn-gray-500:oklch(0.860 0 0);--chatcn-gray-600:oklch(0.800 0 0);--chatcn-gray-700:oklch(0.700 0 0);--chatcn-gray-800:oklch(0.525 0 0);--chatcn-gray-900:oklch(0.440 0 0);--chatcn-green:oklch(0.530 0.130 150);--chatcn-press-scale:0.97;--chatcn-press-scale-icon:0.94;--chatcn-primary:var(--chatcn-gray-1000);--chatcn-primary-fg:var(--chatcn-bg);--chatcn-primary-hover:var(--chatcn-gray-900);--chatcn-radius-lg:12px;--chatcn-radius-md:8px;--chatcn-radius-sm:6px;--chatcn-radius-xs:4px;--chatcn-red:oklch(0.560 0.200 27);--chatcn-shadow-sm:0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 2px 4px oklch(0 0 0 / 0.04);--chatcn-shadow-xs:0 0 0 1px oklch(0 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.04)}.dark{--chatcn-accent:var(--chatcn-gray-1000);--chatcn-accent-fg:var(--chatcn-bg);--chatcn-alpha-200:oklch(1 0 0 / 0.06);--chatcn-alpha-300:oklch(1 0 0 / 0.09);--chatcn-amber:oklch(0.800 0.140 74);--chatcn-bg:oklch(0.145 0 0);--chatcn-blue:oklch(0.710 0.140 252);--chatcn-border:var(--chatcn-gray-400);--chatcn-border-hover:var(--chatcn-gray-500);--chatcn-border-strong:var(--chatcn-gray-600);--chatcn-card:oklch(0.175 0 0);--chatcn-fg:var(--chatcn-gray-1000);--chatcn-fg-faint:var(--chatcn-gray-700);--chatcn-fg-muted:var(--chatcn-gray-900);--chatcn-fg-subtle:var(--chatcn-gray-800);--chatcn-fill:var(--chatcn-gray-100);--chatcn-fill-active:var(--chatcn-gray-300);--chatcn-fill-hover:var(--chatcn-gray-200);--chatcn-gray-100:oklch(0.195 0 0);--chatcn-gray-1000:oklch(0.970 0 0);--chatcn-gray-200:oklch(0.225 0 0);--chatcn-gray-300:oklch(0.255 0 0);--chatcn-gray-400:oklch(0.285 0 0);--chatcn-gray-500:oklch(0.340 0 0);--chatcn-gray-600:oklch(0.410 0 0);--chatcn-gray-700:oklch(0.500 0 0);--chatcn-gray-800:oklch(0.620 0 0);--chatcn-gray-900:oklch(0.720 0 0);--chatcn-green:oklch(0.760 0.150 152);--chatcn-primary:var(--chatcn-gray-1000);--chatcn-primary-fg:var(--chatcn-bg);--chatcn-primary-hover:var(--chatcn-gray-900);--chatcn-red:oklch(0.700 0.175 22);--chatcn-shadow-sm:0 0 0 1px oklch(1 0 0 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.03), 0 2px 4px oklch(0 0 0 / 0.4);--chatcn-shadow-xs:0 0 0 1px oklch(1 0 0 / 0.08), 0 1px 2px oklch(0 0 0 / 0.4)}.chatcn-focus{}.chatcn-focus:focus-visible{outline: 2px solid var(--chatcn-accent); outline-offset: 2px;}.chatcn-spin{animation: chatcn-spin 0.8s linear infinite;}@keyframes chatcn-spin { to { transform: rotate(360deg); } }@media (prefers-reduced-motion: reduce){:root{--chatcn-press-scale:1;--chatcn-press-scale-icon:1;--chatcn-enter-scale:1}}"
if (typeof document !== "undefined" && !document.getElementById("chatcn-product-card")) {
  const style = document.createElement("style")
  style.id = "chatcn-product-card"
  style.textContent = CHATCN_CSS
  document.head.appendChild(style)
}

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

export interface ProductVariantOption {
  value: string
  /** Read aloud and shown next to the group name: "Sage", "EU 42". */
  label: string
  /** Any CSS color. Makes the option a swatch. */
  swatch?: string
  /** `false` keeps the option visible but unavailable. */
  available?: boolean
}

export interface ProductVariantGroup {
  /** "Color", "Size". Also the key in the selection. */
  name: string
  options: ProductVariantOption[]
}

export type ProductStock = "in-stock" | "low-stock" | "out-of-stock" | "preorder"

export type ProductCartState = "idle" | "adding" | "added"

/** Every word the card shows or announces. Pass any of them through `labels` to translate. */
export interface ProductCardLabels {
  inStock: string
  lowStock: string
  onlyLeft: (count: number) => string
  outOfStock: string
  preorder: string
  soldOutOption: (option: string) => string
  rated: string
  reviews: string
  salePrice: string
  regularPrice: string
  percentOff: (percent: number) => string
  compare: string
  addToCart: string
  selectOption: (group: string) => string
  adding: string
  addedToCart: string
  addingToCart: string
  addAnother: string
  addedAnnouncement: (title: string) => string
  cartError: string
  unavailable: string
  retry: string
  noProduct: string
  noMatch: string
}

export interface ProductCardProps extends Omit<React.ComponentProps<"div">, "title" | "children"> {
  title?: string
  merchant?: string
  href?: string
  image?: string
  imageAlt?: string
  /** A short label on the image: "Best match", "Lowest price". */
  badge?: string
  /** Regular price in major units. */
  price?: number
  /** Discounted price. The regular price is struck through next to it. */
  salePrice?: number
  currency?: string
  locale?: string
  /** Out of 5. */
  rating?: number
  reviewCount?: number
  variants?: ProductVariantGroup[]
  /** Controlled selection by group name. */
  selection?: Record<string, string>
  defaultSelection?: Record<string, string>
  onSelectionChange?: (selection: Record<string, string>) => void
  stock?: ProductStock
  /** Units left. Shown for `low-stock`. */
  stockCount?: number
  /** "Ships Dec 2" for preorders, or a delivery promise: "Free delivery Thu, Oct 29". */
  shipping?: string
  /** Return a promise to show progress. A rejection shows an error and keeps the button. */
  onAddToCart?: (selection: Record<string, string>) => unknown | Promise<unknown>
  /** Controlled cart state. */
  cartState?: ProductCartState
  /** Called when the user clicks the product image or title to inspect it. */
  onSelect?: () => void
  /** Show the compare checkbox. On when `compared` or `onComparedChange` is set. */
  comparable?: boolean
  compared?: boolean
  defaultCompared?: boolean
  onComparedChange?: (compared: boolean) => void
  layout?: "grid" | "list"
  loading?: boolean
  error?: React.ReactNode
  onRetry?: () => void
  empty?: React.ReactNode
  /** Translate or reword any text the card shows or announces. */
  labels?: Partial<ProductCardLabels>
}

const DEFAULT_LABELS: ProductCardLabels = {
  inStock: "In stock",
  lowStock: "Low stock",
  onlyLeft: (count) => `Only ${count} left`,
  outOfStock: "Out of stock",
  preorder: "Pre-order",
  soldOutOption: (option) => `${option}, sold out`,
  rated: "Rated",
  reviews: "reviews",
  salePrice: "Sale price",
  regularPrice: "Regular price",
  percentOff: (percent) => `${percent}% off`,
  compare: "Compare",
  addToCart: "Add to cart",
  selectOption: (group) => `Select ${group.replace(/\s*\(.*\)$/, "").toLowerCase()}`,
  adding: "Adding",
  addedToCart: "Added to cart",
  addingToCart: "Adding to cart",
  addAnother: "Added to cart, add another",
  addedAnnouncement: (title) => `${title} added to cart`,
  cartError: "Not added. The store did not respond, so try again in a moment.",
  unavailable: "Product unavailable",
  retry: "Try again",
  noProduct: "No product found",
  noMatch: "Nothing matched. Try a wider price range or fewer filters.",
}

/* -------------------------------------------------------------------------------------------------
 * ProductCard
 * -----------------------------------------------------------------------------------------------*/

const surface =
  "text-[0.875rem]/[1.25rem] tracking-[-0.003em] text-(color:--chatcn-fg) rounded-(--chatcn-radius-lg) bg-(color:--chatcn-card) shadow-(--chatcn-shadow-sm) flex min-w-0"

interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Width and height. Number means px. Default 24. */
  size?: number | string
  /** Stroke width in viewBox units (24 grid). Default 1.5. */
  strokeWidth?: number | string
  /** Keep the rendered stroke at `strokeWidth` px at any size. */
  absoluteStrokeWidth?: boolean
  /** Stroke color. Default currentColor. */
  color?: string
  /** Accessible name. Renders <title> and sets role="img"; without it the icon is aria-hidden. */
  title?: string
}

type Icon = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>

/** Shape elements an icon may contain. */
type IconElement = "path" | "circle" | "rect" | "ellipse" | "line" | "polyline" | "polygon"

/** An icon's drawing: a flat list of [element, attributes] pairs, lucide compatible. */
type IconNode = ReadonlyArray<readonly [IconElement, Readonly<Record<string, string>>]>

const toPascal = (name: string): string =>
  name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

/**
 * Builds a React icon component from an icon node.
 * `name` is the kebab-case icon name, used for the class `chatcn-icon-<name>` and displayName.
 */
function createIcon(name: string, iconNode: IconNode): Icon {
  // biome-ignore lint/correctness/noComponentHookFactories: runs once per icon at module load
  const Component = forwardRef<SVGSVGElement, IconProps>(function ChatcnIcon(
    {
      size = 24,
      strokeWidth = 1.5,
      absoluteStrokeWidth = false,
      color = "currentColor",
      title,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const stroke = absoluteStrokeWidth
      ? (Number(strokeWidth) * 24) / Number.parseFloat(String(size))
      : strokeWidth
    const labelled = Boolean(title || rest["aria-label"] || rest["aria-labelledby"])
    return createElement(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: stroke,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "data-slot": "icon",
        className: className
          ? `chatcn-icon chatcn-icon-${name} ${className}`
          : `chatcn-icon chatcn-icon-${name}`,
        ...(labelled ? { role: "img" } : { "aria-hidden": true }),
        ...rest,
      },
      title ? createElement("title", null, title) : null,
      ...iconNode.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs })),
      children,
    )
  })
  Component.displayName = `${toPascal(name)}Icon`
  return Component
}

const iconNode: IconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" }],
  ["path", { d: "M12 7.75v5" }],
  ["path", { d: "M12 16.25h.01" }],
]

const CircleAlertIcon: Icon = /* @__PURE__ */ createIcon("circle-alert", iconNode)

type ButtonVariant = "solid" | "outline" | "ghost" | "subtle"

type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg"

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const base = cn(
  "chatcn-focus inline-flex shrink-0 items-center justify-center gap-1.5 font-medium whitespace-nowrap select-none",
  "ease-(--chatcn-ease-standard) transition-[background-color,color,box-shadow,scale] duration-150",
  "active:scale-(--chatcn-press-scale) active:duration-100 disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
)

const variants: Record<ButtonVariant, string> = {
  solid: "bg-(color:--chatcn-primary) text-(color:--chatcn-primary-fg) hover:bg-(color:--chatcn-primary-hover)",
  outline: "bg-(color:--chatcn-card) text-(color:--chatcn-fg) shadow-(--chatcn-shadow-xs) hover:bg-(color:--chatcn-fill-hover)",
  ghost: "text-(color:--chatcn-fg-muted) hover:bg-(color:--chatcn-fill-hover) hover:text-(color:--chatcn-fg)",
  subtle: "bg-(color:--chatcn-fill) text-(color:--chatcn-fg) hover:bg-(color:--chatcn-fill-hover)",
}

// Heights follow the control scale: 24, 28, 32, 36. Radii stay concentric inside 12 px surfaces.
const sizes: Record<ButtonSize, string> = {
  xs: "h-6 rounded-(--chatcn-radius-sm) px-2 text-[0.75rem]/[1rem] [&_svg]:size-3.5",
  sm: "h-7 rounded-(--chatcn-radius-sm) px-2.5 text-[0.8125rem]/[1.25rem] [&_svg]:size-3.5",
  md: "h-8 rounded-(--chatcn-radius-md) px-3 text-[0.875rem]/[1.25rem] tracking-[-0.003em] [&_svg]:size-4",
  lg: "h-9 rounded-(--chatcn-radius-md) px-3.5 text-[0.875rem]/[1.25rem] tracking-[-0.003em] [&_svg]:size-4",
  "icon-xs": "size-6 rounded-(--chatcn-radius-sm) active:scale-(--chatcn-press-scale-icon) [&_svg]:size-3.5",
  "icon-sm": "size-7 rounded-(--chatcn-radius-sm) active:scale-(--chatcn-press-scale-icon) [&_svg]:size-3.5",
  "icon-md": "size-8 rounded-(--chatcn-radius-md) active:scale-(--chatcn-press-scale-icon) [&_svg]:size-4",
  "icon-lg": "size-9 rounded-(--chatcn-radius-md) active:scale-(--chatcn-press-scale-icon) [&_svg]:size-4",
}

/** Class names for anything that should look like a button, such as a link. */
function buttonVariants({
  variant = "ghost",
  size = "md",
}: {
  variant?: ButtonVariant
  size?: ButtonSize
} = {}) {
  return cn(base, variants[variant], sizes[size])
}

function Button({
  variant = "ghost",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

const iconNode2: IconNode = [
  ["path", { d: "M5.49 17.46A8.5 8.5 0 1 0 6.54 5.49" }],
  ["path", { d: "m8.21 8.65-2.94-.26a2 2 0 0 1-1.82-2.16l.26-2.94" }],
]

const RotateCcwIcon: Icon = /* @__PURE__ */ createIcon("rotate-ccw", iconNode2)

const iconNode3: IconNode = [
  ["path", { d: "M4 10.75a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 1 0-13.5 0" }],
  ["path", { d: "m15.75 15.75 4.5 4.5" }],
  ["path", { d: "m8.25 8.25 5 5" }],
  ["path", { d: "m13.25 8.25-5 5" }],
]

const SearchXIcon: Icon = /* @__PURE__ */ createIcon("search-x", iconNode3)

const iconNode4: IconNode = [
  ["path", { d: "M2.5 3.5h.98a1.25 1.25 0 0 1 1.22 1l2.06 10.29A1.5 1.5 0 0 0 8.23 16H18.5" }],
  ["path", { d: "M5.25 6.5h13.93a1.25 1.25 0 0 1 1.22 1.53l-.93 4a1.25 1.25 0 0 1-1.21.97H6.5" }],
  ["path", { d: "M7 20a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" }],
  ["path", { d: "M16 20a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" }],
]

const ShoppingCartIcon: Icon = /* @__PURE__ */ createIcon("shopping-cart", iconNode4)

/** The kit's one spinner. 0.8 s per turn, slowed to 1.2 s under reduced motion. */
function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-slot="spinner"
      className={cn("chatcn-spin size-3.5 shrink-0", className)}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      <path
        d="M8 1.75A6.25 6.25 0 0 1 14.25 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const iconNode5: IconNode = [
  ["path", { d: "m4.5 12.75 3.23 3.23a2.5 2.5 0 0 0 3.54 0l8.48-8.48" }],
]

const CheckIcon: Icon = /* @__PURE__ */ createIcon("check", iconNode5)

function VariantGroup({
  group,
  value,
  onChange,
  name,
  labels,
}: {
  group: ProductVariantGroup
  value?: string
  onChange: (value: string) => void
  name: string
  labels: ProductCardLabels
}) {
  const options = group.options.filter((o) => o?.value)
  const swatches = options.some((o) => o.swatch)
  const current = options.find((o) => o.value === value)
  return (
    <fieldset className="flex min-w-0 flex-col gap-1.5">
      <legend className="text-[0.75rem]/[1rem] text-(color:--chatcn-fg-subtle) mb-1.5">
        {group.name}
        {current ? <span className="text-(color:--chatcn-fg-muted)">: {current.label}</span> : null}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const unavailable = option.available === false
          const input = (
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={option.value === value}
              disabled={unavailable}
              onChange={() => onChange(option.value)}
              aria-label={unavailable ? labels.soldOutOption(option.label) : option.label}
              className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-[inherit] outline-none disabled:cursor-not-allowed"
            />
          )
          return swatches ? (
            // biome-ignore lint/a11y/noLabelWithoutControl: the radio is rendered inside through `input`
            <label
              key={option.value}
              title={unavailable ? labels.soldOutOption(option.label) : option.label}
              className={cn(
                "relative grid size-7 place-items-center rounded-full pointer-coarse:size-11",
                "ease-(--chatcn-ease-standard) transition-[box-shadow] duration-150",
                "has-[:checked]:shadow-[0_0_0_1.5px_var(--chatcn-accent)]",
                "has-[:focus-visible]:outline-(color:--chatcn-accent) has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-solid",
              )}
            >
              {input}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none relative size-5 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_var(--chatcn-alpha-300)]",
                  unavailable && "opacity-40",
                )}
                style={{ background: option.swatch }}
              >
                {unavailable ? (
                  <span className="bg-(color:--chatcn-fg) absolute top-1/2 left-1/2 h-px w-[140%] -translate-1/2 -rotate-45" />
                ) : null}
              </span>
            </label>
          ) : (
            // biome-ignore lint/a11y/noLabelWithoutControl: the radio is rendered inside through `input`
            <label
              key={option.value}
              className={cn(
                "text-[0.8125rem]/[1.25rem] rounded-(--chatcn-radius-sm) text-(color:--chatcn-fg) relative inline-flex h-7 min-w-9 items-center justify-center px-2 tabular-nums select-none pointer-coarse:h-11",
                "shadow-[inset_0_0_0_1px_var(--chatcn-border)] hover:shadow-[inset_0_0_0_1px_var(--chatcn-border-hover)]",
                "ease-(--chatcn-ease-standard) transition-[box-shadow,background-color,color] duration-150",
                "has-[:checked]:bg-(color:--chatcn-fill) has-[:checked]:shadow-[inset_0_0_0_1.5px_var(--chatcn-accent)]",
                "has-[:focus-visible]:outline-(color:--chatcn-accent) has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-solid",
                unavailable &&
                  "text-(color:--chatcn-fg-subtle) line-through hover:shadow-[inset_0_0_0_1px_var(--chatcn-border)]",
              )}
            >
              {input}
              <span aria-hidden="true" className="pointer-events-none">
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

const iconNode6: IconNode = [
  ["path", { d: "m3.5 3.5 17 17" }],
  ["path", { d: "M6.64 3H18a3 3 0 0 1 3 3v11.36" }],
  ["path", { d: "M17.36 21H6a3 3 0 0 1-3-3V6.64" }],
  ["path", { d: "M13.75 8.5a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 1 0-3.5 0" }],
  ["path", { d: "m6.25 18 1.94-1.94a1.5 1.5 0 0 1 2.12 0L12.25 18" }],
]

const ImageOffIcon: Icon = /* @__PURE__ */ createIcon("image-off", iconNode6)

/* -------------------------------------------------------------------------------------------------
 * Pieces
 * -----------------------------------------------------------------------------------------------*/

function ProductImage({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  const [state, setState] = React.useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error",
  )
  const ref = React.useRef<HTMLImageElement>(null)
  React.useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setState("loaded")
  }, [])
  return (
    <span className={cn("bg-(color:--chatcn-fill) relative block overflow-hidden", className)}>
      {src && state !== "error" ? (
        <img
          ref={ref}
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={cn(
            "absolute inset-0 size-full object-cover",
            "ease-(--chatcn-ease-out) transition-opacity duration-200 motion-reduce:transition-none",
            state === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : (
        <span className="text-(color:--chatcn-fg-faint) absolute inset-0 grid place-items-center">
          <ImageOffIcon aria-hidden="true" className="size-5" />
        </span>
      )}
      {/* A hairline keeps light product shots from bleeding into the card. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--chatcn-alpha-200)]"
      />
    </span>
  )
}

const iconNode7: IconNode = [
  ["path", { d: "m13.39 6.07.96 2.39a1 1 0 0 0 .86.62l2.57.18a1.5 1.5 0 0 1 .86 2.64l-1.97 1.66a1 1 0 0 0-.33 1.01l.63 2.5a1.5 1.5 0 0 1-2.26 1.63l-2.18-1.37a1 1 0 0 0-1.06 0L9.29 18.7a1.5 1.5 0 0 1-2.26-1.63l.63-2.5a1 1 0 0 0-.33-1.01L5.36 11.9a1.5 1.5 0 0 1 .86-2.64l2.57-.18a1 1 0 0 0 .86-.62l.96-2.39a1.5 1.5 0 0 1 2.78 0" }],
]

const StarIcon: Icon = /* @__PURE__ */ createIcon("star", iconNode7)

/** Five stars filled to the rating, so 4.6 reads as a shape before it reads as a number. */
function Rating({
  value,
  count,
  locale,
  labels,
}: {
  value: number
  count?: number
  locale: string
  labels: ProductCardLabels
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100))
  const stars = (
    <span className="flex gap-px">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className="size-3 shrink-0 fill-current [stroke-width:0]" />
      ))}
    </span>
  )
  return (
    <span className="text-[0.75rem]/[1rem] text-(color:--chatcn-fg-subtle) inline-flex items-center gap-1.5 tabular-nums">
      <span aria-hidden="true" className="relative inline-flex">
        <span className="text-(color:--chatcn-fill-active)">{stars}</span>
        <span
          className="text-(color:--chatcn-fg) absolute inset-y-0 start-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          {stars}
        </span>
      </span>
      <span className="sr-only">{labels.rated}</span>
      <span className="text-(color:--chatcn-fg-muted)">{value.toFixed(1)}</span>
      {count !== undefined ? (
        <span>
          <span aria-hidden="true">(</span>
          {new Intl.NumberFormat(locale, {
            notation: count >= 10_000 ? "compact" : "standard",
          }).format(count)}
          <span className="sr-only"> {labels.reviews}</span>
          <span aria-hidden="true">)</span>
        </span>
      ) : null}
    </span>
  )
}

const iconNode8: IconNode = [
  ["path", { d: "m13.74 4.64 6.95 12.17a2 2 0 0 1-1.74 2.99H5.05a2 2 0 0 1-1.74-2.99l6.95-12.17a2 2 0 0 1 3.48 0" }],
  ["path", { d: "M12 9.25V13" }],
  ["path", { d: "M12 16.25h.01" }],
]

const TriangleAlertIcon: Icon = /* @__PURE__ */ createIcon("triangle-alert", iconNode8)

const iconNode9: IconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" }],
  ["path", { d: "m7.76 7.76 8.48 8.48" }],
]

const BanIcon: Icon = /* @__PURE__ */ createIcon("ban", iconNode9)

const iconNode10: IconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" }],
  ["path", { d: "M12 6.75v4.26a1.75 1.75 0 0 0 .85 1.5l2.9 1.74" }],
]

const ClockIcon: Icon = /* @__PURE__ */ createIcon("clock", iconNode10)

// Separated facts: each fact carries its dot in the gap before it, and the row clips the dot of
// whichever fact starts a line, so a wrapped row never starts or ends on a separator.
const factRow = "flex flex-wrap overflow-hidden gap-x-3"

const fact =
  "relative -ms-3 ps-3 before:absolute before:start-0 before:w-3 before:text-center before:text-(color:--chatcn-fg-subtle) before:content-['·']"

const iconNode11: IconNode = [
  ["path", { d: "M2.5 16.36a1.5 1.5 0 0 1 0-.11V6.5a2 2 0 0 1 2-2H12a2 2 0 0 1 2 2v1a1 1 0 0 0 1 1h2.07a1.5 1.5 0 0 1 1.13.51l2.92 3.31a1.5 1.5 0 0 1 .38 1v2.93a1.5 1.5 0 0 1 0 .11" }],
  ["path", { d: "M9.5 17.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0" }],
  ["path", { d: "M19.5 17.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0" }],
]

const TruckIcon: Icon = /* @__PURE__ */ createIcon("truck", iconNode11)

function StockLine({
  stock,
  stockCount,
  shipping,
  labels,
}: {
  stock?: ProductStock
  stockCount?: number
  shipping?: string
  labels: ProductCardLabels
}) {
  if (!stock && !shipping) return null
  const status =
    stock === "in-stock" ? (
      <span className="text-(color:--chatcn-green) inline-flex items-center gap-1">
        <CheckIcon aria-hidden="true" className="size-3.5" />
        {labels.inStock}
      </span>
    ) : stock === "low-stock" ? (
      <span className="text-(color:--chatcn-amber) inline-flex items-center gap-1">
        <TriangleAlertIcon aria-hidden="true" className="size-3.5" />
        {stockCount !== undefined ? labels.onlyLeft(stockCount) : labels.lowStock}
      </span>
    ) : stock === "out-of-stock" ? (
      <span className="text-(color:--chatcn-fg-subtle) inline-flex items-center gap-1">
        <BanIcon aria-hidden="true" className="size-3.5" />
        {labels.outOfStock}
      </span>
    ) : stock === "preorder" ? (
      <span className="text-(color:--chatcn-blue) inline-flex items-center gap-1">
        <ClockIcon aria-hidden="true" className="size-3.5" />
        {labels.preorder}
      </span>
    ) : null
  return (
    <p className={cn(factRow, "text-[0.75rem]/[1rem] text-(color:--chatcn-fg-subtle) items-center gap-y-1")}>
      {status ? <span className={cn(fact, "inline-flex")}>{status}</span> : null}
      {shipping ? (
        <span className={cn(fact, "inline-flex min-w-0 items-center gap-1")}>
          {status ? null : <TruckIcon aria-hidden="true" className="size-3.5" />}
          {shipping}
        </span>
      ) : null}
    </p>
  )
}

function Price({
  price,
  salePrice,
  money,
  large,
  labels,
}: {
  price: number
  salePrice?: number
  money: Intl.NumberFormat
  large?: boolean
  labels: ProductCardLabels
}) {
  const onSale = salePrice !== undefined && salePrice < price
  const off = onSale ? Math.round((1 - salePrice / price) * 100) : 0
  return (
    <span className="flex flex-wrap items-baseline gap-x-1.5 tabular-nums">
      <span
        className={cn("text-(color:--chatcn-fg) font-medium", large ? "text-[1.125rem]/[1.625rem] tracking-[-0.015em]" : "text-[0.9375rem]/[1.5rem] tracking-[-0.006em]")}
      >
        {onSale ? <span className="sr-only">{labels.salePrice} </span> : null}
        {money.format(onSale ? salePrice : price)}
      </span>
      {onSale ? (
        <>
          <span className="text-[0.8125rem]/[1.25rem] text-(color:--chatcn-fg-subtle) line-through">
            <span className="sr-only">{labels.regularPrice} </span>
            {money.format(price)}
          </span>
          <span className="text-[0.75rem]/[1rem] text-(color:--chatcn-fg-muted)">{labels.percentOff(off)}</span>
        </>
      ) : null}
    </span>
  )
}

function CompareBox({
  checked,
  onChange,
  overlay,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  overlay?: boolean
  label: string
}) {
  return (
    <label
      className={cn(
        "text-[0.75rem]/[1rem] text-(color:--chatcn-fg) relative inline-flex h-7 cursor-pointer items-center gap-1.5 select-none pointer-coarse:h-11",
        overlay
          ? "bg-(color:--chatcn-card) rounded-(--chatcn-radius-sm) shadow-(--chatcn-shadow-xs) px-2"
          : "text-(color:--chatcn-fg-muted) hover:text-(color:--chatcn-fg) ease-(--chatcn-ease-standard) transition-colors duration-150",
        "has-[:focus-visible]:outline-(color:--chatcn-accent) has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-solid",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "rounded-(--chatcn-radius-xs) grid size-3.5 place-items-center shadow-[inset_0_0_0_1px_var(--chatcn-border-strong)]",
          "ease-(--chatcn-ease-standard) transition-[background-color,box-shadow] duration-150",
          "peer-checked:bg-(color:--chatcn-accent) peer-checked:text-(color:--chatcn-accent-fg) peer-checked:shadow-none",
          "[&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100",
        )}
      >
        <CheckIcon className="size-3 [stroke-width:2]" />
      </span>
      {label}
    </label>
  )
}

/**
 * A shopping agent's result: the photo, the price (and sale price) formatted for the currency,
 * a rating you can read at a glance, variant pickers that are real radio groups, stock, and an
 * Add to cart that shows progress and confirms. `layout="grid"` stacks for a results grid,
 * `layout="list"` lays out as one row.
 */
export function ProductCard({
  title,
  merchant,
  href,
  image,
  imageAlt,
  badge,
  price,
  salePrice,
  currency = "USD",
  locale = "en-US",
  rating,
  reviewCount,
  variants,
  selection: selectionProp,
  defaultSelection,
  onSelectionChange,
  stock,
  stockCount,
  shipping,
  onAddToCart,
  cartState: cartProp,
  onSelect,
  comparable,
  compared: comparedProp,
  defaultCompared = false,
  onComparedChange,
  layout = "grid",
  loading = false,
  error,
  onRetry,
  empty,
  labels: labelsProp,
  className,
  ...props
}: ProductCardProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const id = React.useId()
  const groups = (variants ?? []).filter((g) => g?.name && g.options?.length)
  const [selectionState, setSelectionState] = React.useState<Record<string, string>>(() => {
    if (defaultSelection) return defaultSelection
    // Preselect groups with a single available option: there is nothing to choose.
    const initial: Record<string, string> = {}
    for (const g of groups) {
      const open = g.options.filter((o) => o.available !== false)
      if (open.length === 1 && open[0]) initial[g.name] = open[0].value
    }
    return initial
  })
  const selection = selectionProp ?? selectionState
  const [cartState, setCartState] = React.useState<ProductCartState>("idle")
  const [cartError, setCartError] = React.useState<string | null>(null)
  const cart = cartProp ?? cartState
  const [comparedState, setComparedState] = React.useState(defaultCompared)
  const compared = comparedProp ?? comparedState
  const showCompare = comparable ?? (comparedProp !== undefined || onComparedChange !== undefined)
  const list = layout === "list"

  const money = React.useMemo(() => {
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency })
    } catch {
      return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  }, [locale, currency])

  const select = (group: string, value: string) => {
    const next = { ...selection, [group]: value }
    setSelectionState(next)
    onSelectionChange?.(next)
    if (cart === "added") setCartState("idle")
  }

  const missing = groups.find((g) => !selection[g.name])
  const soldOut = stock === "out-of-stock"

  const add = async () => {
    if (missing || soldOut || cart === "adding") return
    setCartError(null)
    const result = onAddToCart?.(selection)
    if (!(result instanceof Promise)) {
      setCartState("added")
      return
    }
    setCartState("adding")
    try {
      await result
      setCartState("added")
    } catch {
      setCartState("idle")
      setCartError(labels.cartError)
    }
  }

  if (error) {
    return (
      <div
        data-slot="product-card"
        data-product-state="error"
        role="alert"
        className={cn(surface, "flex-col gap-2 p-4", className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <CircleAlertIcon aria-hidden="true" className="text-(color:--chatcn-red) size-4 shrink-0" />
          <span className="font-medium">{labels.unavailable}</span>
        </div>
        <p className="text-[0.8125rem]/[1.25rem] text-(color:--chatcn-fg-subtle) ps-6 text-pretty">{error}</p>
        {onRetry ? (
          <Button size="sm" variant="outline" className="ms-6 self-start" onClick={onRetry}>
            <RotateCcwIcon />
            {labels.retry}
          </Button>
        ) : null}
      </div>
    )
  }

  if (loading) {
    return (
      <div
        data-slot="product-card"
        data-product-state="loading"
        data-layout={layout}
        aria-busy="true"
        className={cn(
          surface,
          list ? "@container items-start gap-3 p-3" : "flex-col overflow-hidden",
          className,
        )}
        {...props}
      >
        <span className="sr-only">Loading product</span>
        <span
          aria-hidden="true"
          className={cn(
            "bg-(color:--chatcn-fill) block shrink-0",
            list
              ? "rounded-(--chatcn-radius-md) size-20 @[30rem]:size-24 @[40rem]:size-28"
              : "aspect-[4/3] w-full",
          )}
        />
        <span aria-hidden="true" className={cn("flex flex-1 flex-col gap-2.5", !list && "p-4")}>
          <span className="bg-(color:--chatcn-fill) rounded-(--chatcn-radius-xs) h-2.5 w-1/4" />
          <span className="bg-(color:--chatcn-fill) rounded-(--chatcn-radius-xs) h-3.5 w-4/5" />
          <span className="bg-(color:--chatcn-fill) rounded-(--chatcn-radius-xs) h-2.5 w-1/3" />
          <span className="bg-(color:--chatcn-fill) rounded-(--chatcn-radius-xs) mt-1 h-4 w-1/4" />
          {list ? null : <span className="bg-(color:--chatcn-fill) rounded-(--chatcn-radius-md) mt-2 h-8 w-full" />}
        </span>
      </div>
    )
  }

  if (!title) {
    return (
      <div
        data-slot="product-card"
        data-product-state="empty"
        className={cn(surface, "items-start gap-3 p-4", className)}
        {...props}
      >
        <SearchXIcon aria-hidden="true" className="text-(color:--chatcn-fg-subtle) mt-0.5 size-4 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">{labels.noProduct}</span>
          <span className="text-[0.8125rem]/[1.25rem] text-(color:--chatcn-fg-subtle) text-pretty">
            {empty ?? labels.noMatch}
          </span>
        </div>
      </div>
    )
  }

  const titleNode = onSelect ? (
    <button
      type="button"
      onClick={onSelect}
      className="chatcn-focus cursor-pointer rounded-(--chatcn-radius-xs) text-left hover:decoration-(color:--chatcn-border-strong) underline-offset-2 hover:underline"
    >
      {title}
    </button>
  ) : href ? (
    <a
      href={href}
      className="chatcn-focus rounded-(--chatcn-radius-xs) hover:decoration-(color:--chatcn-border-strong) underline-offset-2 hover:underline"
    >
      {title}
    </a>
  ) : (
    title
  )

  const cartButton = (
    <Button
      size={list ? "sm" : "md"}
      // Waiting on a choice (or sold out) reads as a quiet outline, not a washed out solid.
      variant={cart === "added" ? "subtle" : missing || soldOut ? "outline" : "solid"}
      disabled={!!missing || soldOut || cart === "adding"}
      onClick={add}
      aria-label={
        cart === "adding" ? labels.addingToCart : cart === "added" ? labels.addAnother : undefined
      }
      className={cn(
        "relative pointer-coarse:h-11",
        !list && "w-full",
        cart === "adding" && "disabled:opacity-100",
        (missing || soldOut) && "disabled:text-(color:--chatcn-fg-muted) disabled:opacity-100",
      )}
    >
      {/* The label never changes width: states stack in one grid cell and crossfade. */}
      <span className="grid place-items-center">
        {(["idle", "adding", "added"] as const).map((s) => (
          <span
            key={s}
            aria-hidden={cart !== s}
            className={cn(
              "col-start-1 row-start-1 inline-flex items-center gap-1.5",
              "ease-(--chatcn-ease-out) transition-[opacity,filter,scale] duration-150 motion-reduce:transition-none",
              cart === s ? "scale-100 opacity-100" : "scale-95 opacity-0 blur-[2px]",
            )}
          >
            {s === "idle" ? (
              <>
                <ShoppingCartIcon />
                {soldOut
                  ? labels.outOfStock
                  : missing
                    ? labels.selectOption(missing.name)
                    : labels.addToCart}
              </>
            ) : s === "adding" ? (
              <>
                <Spinner />
                {labels.adding}
              </>
            ) : (
              <>
                <CheckIcon className="text-(color:--chatcn-green)" />
                {labels.addedToCart}
              </>
            )}
          </span>
        ))}
      </span>
    </Button>
  )

  const variantPickers = groups.length ? (
    <div className={cn("flex flex-col gap-3", list && "flex-row flex-wrap gap-x-5")}>
      {groups.map((g) => (
        <VariantGroup
          key={g.name}
          group={g}
          name={`${id}-${g.name}`}
          value={selection[g.name]}
          onChange={(v) => select(g.name, v)}
          labels={labels}
        />
      ))}
    </div>
  ) : null

  const errorLine = cartError ? (
    <p role="alert" className="text-[0.75rem]/[1rem] text-(color:--chatcn-red) flex items-start gap-1.5">
      <CircleAlertIcon aria-hidden="true" className="mt-px size-3.5 shrink-0" />
      {cartError}
    </p>
  ) : null

  const status = (
    <span role="status" className="sr-only">
      {cart === "adding"
        ? labels.addingToCart
        : cart === "added"
          ? labels.addedAnnouncement(title ?? "")
          : ""}
    </span>
  )

  if (list) {
    return (
      <div
        data-slot="product-card"
        data-product-state={cart}
        data-layout="list"
        className={cn(surface, "@container block p-3", className)}
        {...props}
      >
        {/* Narrow (a phone, a side panel): price and actions drop under the details as one row,
            so the title keeps its measure instead of breaking one word per line. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-3 @[30rem]:grid-cols-[auto_minmax(0,1fr)_auto] @[30rem]:gap-x-4">
          <span className="relative shrink-0">
            <ProductImage
              src={image}
              alt={imageAlt}
              className="rounded-(--chatcn-radius-md) size-20 @[30rem]:size-24 @[40rem]:size-28"
            />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2 py-0.5">
            <div className="flex min-w-0 flex-col gap-1">
              {merchant || badge ? (
                <span className="text-[0.75rem]/[1rem] text-(color:--chatcn-fg-subtle) truncate">
                  {merchant}
                  {badge ? (
                    <span className="text-(color:--chatcn-fg-muted)">
                      {merchant ? <span aria-hidden="true"> · </span> : null}
                      {badge}
                    </span>
                  ) : null}
                </span>
              ) : null}
              <h3 className="line-clamp-2 font-medium text-pretty">{titleNode}</h3>
              {rating !== undefined ? (
                <Rating value={rating} count={reviewCount} locale={locale} labels={labels} />
              ) : null}
            </div>
            {variantPickers}
            <StockLine stock={stock} stockCount={stockCount} shipping={shipping} labels={labels} />
            {errorLine}
          </div>
          <div className="col-span-2 flex shrink-0 items-center justify-between gap-3 @[30rem]:col-span-1 @[30rem]:h-full @[30rem]:flex-col @[30rem]:items-end @[30rem]:justify-start @[30rem]:gap-2 @[30rem]:py-0.5 @[30rem]:text-end">
            {price !== undefined ? (
              <Price price={price} salePrice={salePrice} money={money} labels={labels} />
            ) : null}
            <div className="flex flex-row-reverse items-center gap-3 @[30rem]:mt-auto @[30rem]:flex-col @[30rem]:items-end @[30rem]:gap-1">
              {onAddToCart || cartProp ? cartButton : null}
              {showCompare ? (
                <CompareBox
                  label={labels.compare}
                  checked={compared}
                  onChange={(next) => {
                    setComparedState(next)
                    onComparedChange?.(next)
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
        {status}
      </div>
    )
  }

  return (
    <div
      data-slot="product-card"
      data-product-state={cart}
      data-layout="grid"
      className={cn(surface, "flex-col overflow-hidden", className)}
      {...props}
    >
      <span className="relative block">
        {onSelect ? (
          <button
            type="button"
            onClick={onSelect}
            aria-label={title ? `Inspect ${title}` : "Inspect product"}
            className="chatcn-focus block w-full cursor-pointer text-left"
          >
            <ProductImage src={image} alt={imageAlt} className="aspect-[4/3] w-full" />
          </button>
        ) : (
          <ProductImage src={image} alt={imageAlt} className="aspect-[4/3] w-full" />
        )}
        {badge ? (
          <span className="bg-(color:--chatcn-card) text-(color:--chatcn-fg) text-[0.75rem]/[1rem] shadow-(--chatcn-shadow-xs) rounded-(--chatcn-radius-sm) absolute start-2 top-2 inline-flex h-6 items-center px-1.5 font-medium">
            {badge}
          </span>
        ) : null}
        {showCompare ? (
          <span className="absolute end-2 top-2">
            <CompareBox
              label={labels.compare}
              overlay
              checked={compared}
              onChange={(next) => {
                setComparedState(next)
                onComparedChange?.(next)
              }}
            />
          </span>
        ) : null}
      </span>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex min-w-0 flex-col gap-1">
          {merchant ? (
            <span className="text-[0.75rem]/[1rem] text-(color:--chatcn-fg-subtle) truncate">{merchant}</span>
          ) : null}
          <h3 className="line-clamp-2 font-medium text-pretty">{titleNode}</h3>
          {rating !== undefined ? (
            <Rating value={rating} count={reviewCount} locale={locale} labels={labels} />
          ) : null}
        </div>
        {price !== undefined ? (
          <Price price={price} salePrice={salePrice} money={money} large labels={labels} />
        ) : null}
        {variantPickers}
        <StockLine stock={stock} stockCount={stockCount} shipping={shipping} labels={labels} />
        {onAddToCart || cartProp ? <div className="mt-auto pt-1">{cartButton}</div> : null}
        {errorLine}
      </div>
      {status}
    </div>
  )
}

export default ProductCard
