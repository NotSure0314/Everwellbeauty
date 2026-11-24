import { CheckCircle2, Star } from "lucide-react";
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Marquee } from "@/components/ui/marquee";
import curlsPhoto from "@/assets/curls-lifestyle.jpg";
import combPhoto from "@/assets/comb-transparent-detail.jpg";
import combHeroPhoto from "@/assets/comb-transparent-hero.jpg";
import curlerPhoto from "@/assets/curler-silk-set.jpg";

export type Testimonial = {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  product?: string;
  userPhoto?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Elena R.",
    role: "Verified Buyer · Rosemary Scalp Ritual",
    product: "Transparent Scalp Oil Comb",
    content:
      "Works so good I love it!! 😍 The rollerballs glide smoothly along my scalp parts and all the oil goes right to the roots without dripping down my neck or coating my fingers.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    userPhoto: combPhoto,
  },
  {
    name: "Jessica M.",
    role: "Verified Buyer · Silk Overnight Curler",
    product: "Wire-Free Heatless Curler",
    content:
      "I am a strict side-sleeper and every other curler rod I tried felt like sleeping on a brick. This flat silk curler is cloud-soft! Woke up with gorgeous, bouncy blowout curls with zero ear or neck pain.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    userPhoto: curlsPhoto,
  },
  {
    name: "Marcus T.",
    role: "Verified Buyer · Scalp Density Care",
    product: "Transparent Scalp Oil Comb",
    content:
      "A complete game changer for my rosemary hair oiling routine. The wide top opening makes pouring straight from my dropper bottle so easy without any mess or funnels. The rollerballs feel amazing.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    userPhoto: combHeroPhoto,
  },
  {
    name: "Amanda K.",
    role: "Verified Buyer · Side-Sleeper Curler",
    product: "Wire-Free Heatless Curler",
    content:
      "The 22-momme pure silk is so gentle on fine hair. No friction, zero frizz, and the matching silk scrunchies keep everything secure all night. Best morning waves I've ever gotten without heat damage.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    userPhoto: curlerPhoto,
  },
  {
    name: "Chloe D.",
    role: "Verified Buyer · Root Treatment Ritual",
    product: "Transparent Scalp Oil Comb",
    content:
      "Much higher quality than I expected! The crystal clear acrylic looks beautiful on my vanity and the metal teeth distribute hair serums directly to the scalp with zero waste.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Verified Buyer · Heatless Styling",
    product: "Wire-Free Heatless Curler",
    content:
      "Finally a heatless curler that doesn't bend or poke you while you sleep. Curls stayed defined and silky all day long without touching a curling iron or damaging my hair.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export const Component = ({
  items = testimonials,
  speed = "normal",
  reverse = false,
}: {
  items?: Testimonial[];
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
}) => {
  return (
    <div className="w-full overflow-hidden py-4">
      <Marquee pauseOnHover speed={speed} reverse={reverse} className="py-2">
        {items.map((testimonial, index) => (
          <LiquidCard
            key={index}
            className="mx-2 w-84 sm:w-96 flex flex-col justify-between rounded-3xl bg-white/70 p-6 backdrop-blur-md border border-[#eee7de] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <CardContent className="p-0 flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 object-cover rounded-full ring-2 ring-primary/20"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-[#2c1810] text-sm sm:text-base">
                          {testimonial.name}
                        </h4>
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-xs text-[#8f8078]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#d4974f] text-[#d4974f]"
                    />
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-[#4a3b34] italic font-serif">
                  "{testimonial.content}"
                </p>
              </div>

              {testimonial.userPhoto && (
                <div className="mt-4 pt-3 border-t border-[#f0eae1] flex items-center gap-3">
                  <img
                    src={testimonial.userPhoto}
                    alt={`${testimonial.name} review photo`}
                    className="h-14 w-14 rounded-xl object-cover border border-[#e5ded5]"
                    loading="lazy"
                  />
                  <div className="text-xs">
                    <p className="font-medium text-[#2c1810]">Customer photo</p>
                    <p className="text-[#8f8078]">{testimonial.product}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </LiquidCard>
        ))}
      </Marquee>
    </div>
  );
};

export const MarqueeTestimonials = Component;
export default Component;
