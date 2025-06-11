"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Oferta", href: "#offer" },
  { label: "Umiejętności", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Galeria", href: "#gallery" },
  { label: "Opinie", href: "#testimonials" },
  { label: "Kontakt", href: "#contact" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Image
            src="/logokarol.png"
            alt="Karol Kornowski logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold text-xl dark:text-white">Karol Kornowski</span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-gray-800 hover:text-[#7e5d44] transition-colors dark:text-gray-200 dark:hover:text-[#d3b9a3]"
            >
              {item.label}
            </a>
          ))}
        </motion.nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-800 dark:text-gray-200"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-gray-800 hover:text-[#7e5d44] transition-colors dark:text-gray-200 dark:hover:text-[#d3b9a3] py-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
