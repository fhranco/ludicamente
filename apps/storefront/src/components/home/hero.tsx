import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "@/components/ui/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  GiftIcon,
  CheckmarkCircle02Icon,
  DeliveryTruck01Icon,
  Shield01Icon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons"
import { StoreSettings } from "@/lib/medusa"

interface HeroProps {
  settings?: StoreSettings
}

export function Hero({ settings }: HeroProps) {
  const customTitle = settings?.hero_title

  return (
    <section className="relative overflow-hidden bg-[#fff7ef] rounded-b-[36px] sm:rounded-b-[48px] isolate">
      {/* Fondo con matriz de puntos sutil */}
      <div
        className="absolute inset-0 -z-10 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#e7d6c5 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to right, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] items-center gap-10 lg:gap-8 min-h-[560px] lg:min-h-[610px]">
          {/* Columna de Texto */}
          <div className="relative z-10 py-4 sm:py-6 space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#ecdcc8] text-[#4b347d] text-[0.72rem] font-extrabold tracking-[0.14em] uppercase shadow-sm">
              <span className="text-[#fa795f] text-xs">✦</span>
              <span>MENOS PANTALLAS, MÁS AVENTURAS</span>
            </div>

            {/* H1 Principal */}
            <h1 className="font-display font-semibold text-[3rem] sm:text-[4.2rem] lg:text-[4.8rem] xl:text-[5.4rem] leading-[1.02] tracking-[-0.055em] text-[#2d2943] max-w-[620px] mx-auto lg:mx-0">
              {customTitle ? (
                customTitle
              ) : (
                <>
                  Aprender y compartir,{" "}
                  <span className="text-[#fa795f] relative inline-block">
                    jugando en familia.
                  </span>
                </>
              )}
            </h1>

            {/* 3 Bullets con Checkmarks Duotone */}
            <ul className="space-y-3 pt-1 text-left max-w-[460px] mx-auto lg:mx-0 text-sm sm:text-[0.96rem] font-semibold text-[#54495c]">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#e8dcff] text-[#4b347d] grid place-items-center shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={2.5} />
                </span>
                <span>Juguetes que estimulan su creatividad</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#d8f2df] text-[#2e8b57] grid place-items-center shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={2.5} />
                </span>
                <span>Momentos reales sin pantallas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#e8dcff] text-[#4b347d] grid place-items-center shrink-0">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={2.5} />
                </span>
                <span>Para todas las etapas de su crecimiento</span>
              </li>
            </ul>

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2.5 bg-[#fa795f] hover:bg-[#ea684e] text-white px-7 py-3.5 sm:py-4 rounded-full font-extrabold text-[0.95rem] shadow-[0_8px_20px_rgba(250,121,95,0.28)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Descubrir juguetes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#cumpleanos"
                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#4b347d] border border-[#d8c7b8] px-6 py-3.5 sm:py-4 rounded-full font-extrabold text-[0.95rem] shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <HugeiconsIcon icon={GiftIcon} size={18} strokeWidth={2} className="text-[#4b347d]" />
                <span>Ideas de regalo</span>
              </a>
            </div>

            {/* Trust Badges Inferiores */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 text-[#7d7480] text-[0.76rem] font-bold">
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={DeliveryTruck01Icon} size={16} strokeWidth={2} className="text-[#fa795f]" />
                <span>Envíos a todo Chile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={Shield01Icon} size={16} strokeWidth={2} className="text-[#2e8b57]" />
                <span>Pago seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={FavouriteIcon} size={16} strokeWidth={2} className="text-[#fa795f]" />
                <span>Compra con confianza</span>
              </div>
            </div>
          </div>

          {/* Columna Visual: Fotografía Niños con Bloques destacada en grande */}
          <div className="relative flex items-center justify-center lg:justify-end select-none">
            {/* Contenedor ampliado para dar máximo protagonismo a los niños */}
            <div className="relative w-full max-w-[660px] lg:-mr-4">
              {/* Mancha orgánica pastel suave detrás de los niños */}
              <div
                className="absolute inset-2 -right-4 bg-gradient-to-tr from-[#ffe5d9]/60 via-[#ffeedd]/50 to-[#ebdfff]/40 rounded-[48%_52%_45%_55%_/_50%_48%_52%_50%] -rotate-2 -z-10 blur-sm pointer-events-none"
                aria-hidden="true"
              />

              {/* Arcoíris vectorial flotante superior */}
              <div
                className="absolute -top-8 sm:-top-11 left-[14%] sm:left-[16%] w-18 sm:w-22 h-auto z-20 pointer-events-none drop-shadow-xs"
                aria-hidden="true"
              >
                <Image
                  src="/home/decorations/arcoiris-ludico.svg"
                  alt=""
                  width={88}
                  height={70}
                  className="w-full h-auto"
                />
              </div>

              {/* Estrella amarilla izquierda */}
              <div
                className="absolute top-[42%] -left-3 sm:-left-6 w-11 sm:w-13 h-auto z-20 pointer-events-none"
                aria-hidden="true"
              >
                <Image
                  src="/home/decorations/estrella-amarilla.svg"
                  alt=""
                  width={52}
                  height={52}
                  className="w-full h-auto"
                />
              </div>

              {/* Anotación editorial con rayitas moradas a la derecha */}
              <div className="absolute -top-3 sm:-top-6 right-2 sm:right-4 z-20 flex flex-col items-end pointer-events-none">
                <Image
                  src="/home/decorations/rayitas-moradas.svg"
                  alt=""
                  width={42}
                  height={42}
                  className="w-8 sm:w-10 h-auto mb-1 translate-x-1"
                  aria-hidden="true"
                />
                <div className="bg-white/95 backdrop-blur-sm border border-[#e5d8cc] rounded-2xl px-4 py-2.5 shadow-[0_8px_20px_rgba(75,52,125,0.08)] max-w-[190px] text-right">
                  <span className="block font-display font-semibold text-xs sm:text-[0.88rem] text-[#4b347d] leading-snug">
                    Pequeños juegos, grandes descubrimientos
                  </span>
                </div>
              </div>

              {/* Fotografía de los niños en grande (aspect ratio nativo 1062/906 ~ 1.17) */}
              <div className="relative w-full aspect-[1062/906] flex items-center justify-center">
                <Image
                  src="/home/photos/hero-ninos-bloques.webp"
                  alt="Niños sonrientes aprendiendo y construyendo con bloques de madera en familia"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 660px"
                  className="object-contain drop-shadow-[0_20px_35px_rgba(75,52,125,0.15)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
