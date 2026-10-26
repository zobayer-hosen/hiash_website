"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, Fragment } from "react";
import { ArrowUpRight, Gem, Ruler, Truck, Users } from "lucide-react";
import { cn, pexels } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { JaaliPattern, Ornament } from "@/components/ui/ornament";
import { RotatingBadge } from "@/components/ui/rotating-badge";
import { CountUp, Float } from "@/components/motion/effects";
import { MaskLines } from "@/components/motion/mask-lines";
import { EASE_LUXE, fadeUp, stagger } from "@/components/motion/variants";

const SLIDE_MS = 6500;

/** Each wedding event has a coordinated colour story: bride, couple and groom. */
const slides = [
  {
    key: "biye",
    label: "The Biye",
    title: "Rani red & Maharaja gold",
    couple: pexels(37189417),
    bride: pexels(12959396),
    groom: pexels(28332659),
  },
  {
    key: "holud",
    label: "The Holud",
    title: "Marigold, turmeric & joy",
    couple: pexels(35560843),
    bride: pexels(11726516),
    groom: pexels(28113612),
  },
  {
    key: "reception",
    label: "The Reception",
    title: "Blush, rose & candlelight",
    couple: pexels(31957455),
    bride: pexels(30184702),
    groom: pexels(35542193),
  },
];

const trust = [
  { Icon: Ruler, text: "Bespoke fittings in Gulshan" },
  { Icon: Gem, text: "Hand zardozi by 120+ karigars" },
  { Icon: Users, text: "Coordinated couple styling" },
  { Icon: Truck, text: "Nationwide insured delivery" },
];

function ArchImage({
  src,
  alt,
  sizes,
  preload,
  zoom = true,
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  zoom?: boolean;
}) {
  return (
    <AnimatePresence initial={false}>
      <m.div
        key={src}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: EASE_LUXE }}
      >
        <m.div
          className="absolute inset-0"
          initial={{ scale: zoom ? 1.14 : 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: SLIDE_MS / 1000 + 1, ease: "easeOut" }}
        >
          <Image src={src} alt={alt} fill preload={preload} sizes={sizes} className="object-cover object-top" />
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}

function SideArch({
  src,
  alt,
  href,
  label,
  side,
  delay,
  y,
}: {
  src: string;
  alt: string;
  href: string;
  label: string;
  side: "left" | "right";
  delay: number;
  y: MotionValue<number>;
}) {
  return (
    <m.div style={{ y }} className={cn("absolute bottom-10 h-[64%] w-[30%]", side === "left" ? "left-0" : "right-0")}>
      <m.div
        className="relative h-full"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE_LUXE, delay }}
      >
        <span className="absolute -inset-2 rounded-t-full border border-gold/35" aria-hidden />
        <div className="relative h-full overflow-hidden rounded-t-full bg-wine">
          <ArchImage src={src} alt={alt} sizes="200px" zoom={false} />
        </div>
        <Link
          href={href}
          className="group mt-4 flex items-center justify-center gap-1.5 text-[0.62rem] tracking-[0.2em] text-cream/75 uppercase hover:text-gold-light sm:text-[0.68rem]"
        >
          {label}
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </m.div>
    </m.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  // Auto-advance; restarts whenever the visitor picks an occasion.
  useEffect(() => {
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const ySide = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-wine-dark text-cream"
      aria-roledescription="carousel"
    >
      {/* Ambient backdrop: blurred slide colour + gold glow + jaali lattice */}
      <AnimatePresence initial={false}>
        <m.div
          key={slide.couple}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.22 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <Image src={slide.couple} alt="" fill sizes="40vw" className="scale-125 object-cover blur-3xl" />
        </m.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_10%,rgba(196,160,106,0.28),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(192,98,109,0.3),transparent_55%)]" />
      <JaaliPattern id="hero-jaali" className="-z-10 text-gold-light opacity-[0.07]" />

      <m.div
        style={{ opacity: contentOpacity }}
        className="container-x relative grid items-center gap-14 pt-14 pb-14 lg:grid-cols-[1fr_1.08fr] lg:gap-6 lg:pt-20 lg:pb-16"
      >
        {/* Copy */}
        <m.div variants={stagger(0.12, 0.2)} initial="hidden" animate="show" className="max-w-xl">
          <m.div variants={fadeUp}>
            <Ornament>The Wedding Edit · 2026</Ornament>
          </m.div>
          <h1 className="mt-7 font-display text-[3.3rem] leading-[0.95] font-medium tracking-tight sm:text-7xl xl:text-[6rem]">
            <MaskLines
              trigger="mount"
              delay={0.35}
              lines={[
                "Dressed for",
                <Fragment key="line-1">
                  your{" "}
                  <m.em
                    className="bg-[linear-gradient(110deg,#e8d3a6,#c4a06a_40%,#f6e9cc_55%,#c4a06a_70%,#e8d3a6)] bg-[length:250%_100%] bg-clip-text pr-2 font-normal text-transparent italic"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  >
                    forever.
                  </m.em>
                </Fragment>,
              ]}
            />
          </h1>
          <m.p variants={fadeUp} className="mt-7 max-w-md text-lg leading-relaxed text-cream/75">
            Bridal lehengas, regal sherwanis, heirloom jewellery and wedding-ready beauty — hand-embroidered in Dhaka for every
            moment from gaye holud to bou bhaat.
          </m.p>
          <m.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/collections/wedding?type=Bridal+Lehenga" variant="gold" size="lg">
              Shop the bride
            </ButtonLink>
            <ButtonLink href="/collections/wedding?type=Sherwani" variant="outlineLight" size="lg">
              Shop the groom
            </ButtonLink>
          </m.div>

          {/* Occasion selector */}
          <m.div variants={fadeUp} className="mt-11 grid grid-cols-3 gap-4" role="tablist" aria-label="Wedding occasions">
            {slides.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="group text-left"
              >
                <span className="block h-px w-full overflow-hidden bg-cream/20">
                  {i === index && (
                    <m.span
                      key={`progress-${index}`}
                      className="block h-full origin-left bg-gold"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "mt-3 block font-display text-lg transition-colors sm:text-xl",
                    i === index ? "text-gold-light" : "text-cream/50 group-hover:text-cream/80",
                  )}
                >
                  {item.label}
                </span>
                <span className="text-[0.68rem] tracking-[0.12em] text-cream/45 uppercase">0{i + 1}</span>
              </button>
            ))}
          </m.div>

          <m.dl variants={fadeUp} className="mt-9 flex flex-wrap gap-x-9 gap-y-4 border-t border-cream/15 pt-7">
            <div>
              <dt className="sr-only">Couples dressed</dt>
              <dd className="font-display text-3xl font-semibold text-gold-light lining-nums">
                <CountUp value={1200} suffix="+" />
              </dd>
              <dd className="text-[0.68rem] tracking-[0.18em] text-cream/55 uppercase">Couples dressed</dd>
            </div>
            <div>
              <dt className="sr-only">Master karigars</dt>
              <dd className="font-display text-3xl font-semibold text-gold-light lining-nums">
                <CountUp value={120} suffix="+" />
              </dd>
              <dd className="text-[0.68rem] tracking-[0.18em] text-cream/55 uppercase">Master karigars</dd>
            </div>
            <div>
              <dt className="sr-only">Average rating</dt>
              <dd className="font-display text-3xl font-semibold text-gold-light lining-nums">4.9 ★</dd>
              <dd className="text-[0.68rem] tracking-[0.18em] text-cream/55 uppercase">Average rating</dd>
            </div>
          </m.dl>
        </m.div>

        {/* Triptych */}
        <div className="relative mx-auto h-[440px] w-full max-w-[620px] sm:h-[580px] lg:h-[640px]">
          <SideArch
            side="left"
            src={slide.bride}
            alt={`Bride — ${slide.label}, ${slide.title}`}
            href="/collections/wedding?type=Bridal+Lehenga"
            label="For the bride"
            delay={0.5}
            y={ySide}
          />

          {/* Couple — centre stage */}
          <m.div style={{ y: yCenter }} className="absolute top-0 left-[33%] h-[86%] w-[34%] sm:left-[32%] sm:w-[36%]">
            <m.div
              className="relative h-full"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: EASE_LUXE, delay: 0.3 }}
            >
              <span className="absolute -inset-3 rounded-t-full border border-gold/50" aria-hidden />
              <span className="absolute -inset-[22px] rounded-t-full border border-gold/15" aria-hidden />
              <div className="relative h-full overflow-hidden rounded-t-full bg-wine shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                <ArchImage
                  src={slide.couple}
                  alt={`Bride and groom — ${slide.label}`}
                  sizes="(min-width: 1024px) 240px, 40vw"
                  preload={index === 0}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-wine-dark/80 to-transparent" />
              </div>
              <div className="absolute inset-x-0 -bottom-6 flex justify-center">
                <AnimatePresence mode="wait">
                  <m.p
                    key={slide.key}
                    className="rounded-full border border-gold/40 bg-wine-dark/85 px-4 py-2 text-center backdrop-blur"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="block text-[0.58rem] tracking-[0.24em] text-gold-light uppercase">{slide.label}</span>
                    <span className="block font-display text-sm whitespace-nowrap text-cream sm:text-base">{slide.title}</span>
                  </m.p>
                </AnimatePresence>
              </div>
            </m.div>
          </m.div>

          <SideArch
            side="right"
            src={slide.groom}
            alt={`Groom — ${slide.label}, ${slide.title}`}
            href="/collections/wedding?type=Sherwani"
            label="For the groom"
            delay={0.65}
            y={ySide}
          />

          {/* Ornaments */}
          <m.div
            className="absolute -top-2 right-0 hidden sm:block"
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1, ease: EASE_LUXE }}
          >
            <RotatingBadge
              href="/collections/wedding"
              tone="gold"
              text="Bespoke Couture ✦ Bespoke Couture ✦ "
              className="sm:size-28"
            />
          </m.div>
          <Float className="absolute top-6 left-[6%] hidden sm:block" amplitude={12} duration={7}>
            <Image src="/brand/butterfly.png" alt="" width={319} height={299} className="w-16 opacity-90" />
          </Float>
          {["top-[46%] left-[31%]", "top-[16%] right-[31%]", "bottom-[4%] left-[48%]"].map((position, i) => (
            <m.span
              key={position}
              className={cn("absolute text-gold-light", position)}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
              aria-hidden
            >
              ✦
            </m.span>
          ))}
        </div>
      </m.div>

      {/* Trust strip */}
      <div className="relative border-t border-gold/20 bg-wine-dark/60 backdrop-blur-sm">
        <m.ul
          className="container-x grid grid-cols-2 gap-x-6 gap-y-3 py-5 lg:grid-cols-4"
          variants={stagger(0.08, 0.9)}
          initial="hidden"
          animate="show"
        >
          {trust.map(({ Icon, text }) => (
            <m.li
              key={text}
              variants={fadeUp}
              className="flex items-center gap-3 text-[0.68rem] tracking-[0.14em] text-cream/80 uppercase sm:text-[0.72rem]"
            >
              <Icon className="size-4 shrink-0 text-gold" aria-hidden />
              {text}
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
