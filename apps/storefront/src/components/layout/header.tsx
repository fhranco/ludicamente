"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from "@/components/ui/icons"
import { useCart } from "@/context/cart-context"
import { SearchModal } from "@/components/layout/search-modal"

interface HeaderProps {
  onOpenSearch?: () => void
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { totalItems, openCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  const handleOpenSearch = () => {
    if (onOpenSearch) {
      onOpenSearch()
    } else {
      setSearchModalOpen(true)
    }
  }

  const navLinks = [
    { name: "Categorías", href: "/#categorias" },
    { name: "Nuestros favoritos", href: "/#favoritos" },
    { name: "Por edades", href: "/#edades" },
    { name: "Nuestra filosofía", href: "/#filosofia" },
    { name: "Club de ideas", href: "/#club" },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-[rgba(255,252,247,0.97)] backdrop-blur-md border-b border-[#f0eae2] transition-all">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-[82px] sm:h-[88px] gap-4 sm:gap-7">
            {/* Logo & Marca */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              aria-label="Ludicamente, ir al inicio"
            >
              <span className="w-11 h-11 sm:w-12 sm:h-12 relative -rotate-[10deg] group-hover:rotate-0 transition-transform">
                <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
                  <path
                    d="M31 2c7 0 9 10 9 10s11-4 15 2c4 6-3 14-3 14s10 5 9 13c-1 7-13 8-13 8s-1 12-9 13c-7 1-13-9-13-9s-10 7-16 2C5 50 9 40 9 40S-1 34 2 27c3-7 14-7 14-7S17 3 25 3l6-1Z"
                    fill="#ffd678"
                    stroke="#4b347d"
                    strokeWidth="2.3"
                  />
                  <circle cx="24" cy="29" r="3" fill="#4b347d" />
                  <circle cx="40" cy="29" r="3" fill="#4b347d" />
                  <path
                    d="M25 39q8 9 16 0"
                    fill="none"
                    stroke="#4b347d"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 17l-3-4M49 17l3-5"
                    stroke="#fa795f"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl sm:text-[2.1rem] leading-[0.85] tracking-[-0.046em] text-[#4b347d]">
                  ludi<span className="text-[#fa795f]">ca</span>mente
                </span>
                <small className="block font-extrabold text-[0.55rem] tracking-[0.23em] text-[#a18e9d] mt-1.5 pl-0.5 uppercase">
                  Juegos con sentido
                </small>
              </div>
            </Link>

            {/* Menú Desktop */}
            <nav className="hidden lg:flex items-center justify-center gap-7 flex-1 text-sm font-extrabold text-[#2d2943]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative py-1 text-[0.88rem] whitespace-nowrap hover:text-[#4b347d] transition-colors group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-[-6px] left-0 w-full h-[3px] bg-[#fa795f] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                </Link>
              ))}
            </nav>

            {/* Acciones & Carrito */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Botón Buscar */}
              <button
                type="button"
                onClick={handleOpenSearch}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center text-[#2d2943] hover:bg-[#f0e5fb] transition-colors"
                aria-label="Buscar juegos"
              >
                <Search className="w-5 h-5 text-[#4b347d]" />
              </button>

              {/* Botón Carrito / Bolsa */}
              <button
                onClick={openCart}
                type="button"
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full grid place-items-center bg-[#e9defc] hover:bg-[#ded1f7] text-[#4b347d] transition-all group shadow-sm active:scale-95"
                aria-label={`Abrir carrito con ${totalItems} productos`}
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#fa795f] text-white text-[11px] font-extrabold min-w-[20px] h-5 px-1 rounded-full grid place-items-center border-2 border-[#fffcf7] animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Botón Móvil */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="lg:hidden w-10 h-10 rounded-full grid place-items-center text-[#2d2943] hover:bg-[#f0e5fb] focus:outline-none"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#4b347d]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#4b347d]" />
                )}
              </button>
            </div>
          </div>

          {/* Menú Desplegable Móvil */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-5 border-t border-[#f0eae2] space-y-2 animate-in slide-in-from-top duration-200">
              <div className="text-xs font-bold text-[#8a8190] uppercase px-3 py-1 tracking-wider">
                Explorar Ludicamente
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-display font-semibold text-lg text-[#2d2943] hover:bg-[#e9defc]/40 hover:text-[#4b347d] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Modal de Búsqueda Flotante */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  )
}
