"use client";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Mail, Smartphone, Globe, ArrowDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { Header } from "../components/ui/header";
import { Testimonials } from "../components/ui/testimonials";
import { PortfolioProjects } from "../components/ui/portfolio-projects";
import { ContactForm } from "../components/ui/contact-form";
import { ScrollAnimation } from "../components/ui/scroll-animation";
import { SkillsSection } from "../components/ui/skills-section";
import { StatisticsSection } from "../components/ui/statistics-section";
import { ProjectGallery } from "../components/ui/project-gallery";
import { Typewriter } from "../components/ui/typewriter";
import { useState, useEffect } from "react";

export default function Home() {
  // Add dark mode setup
  useEffect(() => {
    // Check if dark mode is saved in local storage or user prefers dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f0eb] via-[#e7d9cb] to-[#c9b5a1] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white px-4 py-10 md:px-10 font-sans">
      <ThemeToggle />
      <Header />
      
      <motion.section
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto space-y-12 pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Image
            src="/logokarol.png"
            alt="Karol Kornowski logo"
            width={160}
            height={160}
            className="rounded-full shadow-md animate-float"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-zinc-900 dark:text-white"
        >
          <Typewriter 
            text="Profesjonalne strony internetowe dla Twojego biznesu" 
            delay={70}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-center text-gray-800 dark:text-gray-300"
        >
          Oferuję kompleksowe tworzenie stron internetowych dopasowanych do potrzeb Twojej działalności. Stawiam na przejrzysty design, nowoczesne technologie oraz pełną responsywność. Każdy projekt tworzę indywidualnie, z myślą o jego skuteczności w pozyskiwaniu klientów i budowaniu wizerunku firmy. Dodatkowo zajmuję się optymalizacją SEO, budowaniem struktury pod marketing cyfrowy oraz dopasowaniem technicznym strony do różnych kanałów sprzedaży.
        </motion.p>
        
        <div className="flex justify-center">
          <motion.a
            href="#offer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-[#7e5d44] dark:hover:text-[#d3b9a3] transition-colors"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              document.querySelector('#offer')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="mb-1">Zobacz ofertę</span>
            <ArrowDown className="animate-bounce" size={24} />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          id="offer"
          className="grid gap-8 md:grid-cols-3 pt-10"
        >
          {[{
            title: "Mini-Wizytówka",
            desc: "1 strona, dane kontaktowe, mapa",
            price: "600 zł",
          }, {
            title: "Mała strona firmowa",
            desc: "3-4 podstrony, galeria, oferta",
            price: "1000 zł",
          }, {
            title: "Pełna wersja",
            desc: "5+ podstron, formularz, SEO",
            price: "1500–1800 zł",
          }].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-[#7e5d44] to-[#b49478] h-2" />
                <CardContent className="p-6 space-y-3">
                  <h2 className="text-2xl font-semibold text-[#7e5d44] dark:text-[#d3b9a3]">{item.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{item.desc} <br />Czas realizacji: 3 dni robocze</p>
                  <ul className="space-y-2 mt-3">
                    {[
                      item.title === "Mini-Wizytówka" ? ["Responsywny design", "Szybkie ładowanie", "Podstawowe SEO"] :
                      item.title === "Mała strona firmowa" ? ["Wszystko z Mini-Wizytówki", "Formularz kontaktowy", "Galeria zdjęć", "Optymalizacja SEO"] :
                      ["Wszystko z Małej strony", "Zaawansowana optymalizacja SEO", "Integracja z mediami społecznościowymi", "Panel administracyjny"]
                    ].flat().map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 text-[#7e5d44] dark:text-[#d3b9a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xl font-bold mt-4 text-[#7e5d44] dark:text-[#d3b9a3]">{item.price}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <section id="skills" className="pt-16">
          <SkillsSection />
        </section>

        <section className="pt-0">
          <StatisticsSection />
        </section>
          
        <section id="portfolio" className="pt-16">
          <PortfolioProjects />
        </section>
        
        <section id="gallery" className="pt-16">
          <ProjectGallery />
        </section>
        
        <section id="testimonials" className="pt-16">
          <Testimonials />
        </section>
        
        <section id="contact" className="pt-16">
          <ContactForm />
        </section>

        <div className="text-center text-gray-700 dark:text-gray-300 space-y-4">
          <p className="mt-16 text-sm">Przykład strony mojego autorstwa: 
            <a href="https://www.bandoo.studio" className="text-[#7e5d44] dark:text-[#d3b9a3] underline hover:text-[#5f4531] ml-1" target="_blank" rel="noopener noreferrer">
              www.bandoo.studio <ExternalLink size={14} className="inline" />
            </a>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">Dla zainteresowanych dostępna jest również opcja bieżącego wsparcia technicznego oraz aktualizacji strony — 100 zł/miesięcznie w formie abonamentu.</p>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="pt-12 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 mt-10 text-center"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <p className="flex justify-center items-center gap-2"><Smartphone size={16} /> +48 667 530 007</p>
            <p className="flex justify-center items-center gap-2"><Mail size={16} /> kornowski.karol1@gmail.com</p>
            <p className="flex justify-center items-center gap-2"><Globe size={16} /> [Link do strony wkrótce]</p>
          </div>
          <p className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} Designed & developed by Karol Kornowski</p>
        </motion.footer>
      </motion.section>
    </main>
  );
}
