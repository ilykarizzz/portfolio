"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ScrollAnimation } from './scroll-animation';

type ImageData = {
  url: string;
  alt: string;
  description?: string;
};

const images: ImageData[] = [
  {
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    alt: "Bandoo Studio - strona główna",
    description: "Strona główna studia produkcyjnego",
  },
  {
    url: "https://images.unsplash.com/photo-1593697821028-7cc59cfd7399",
    alt: "Bandoo Studio - portfolio",
    description: "Sekcja portfolio z projektami",
  },
  {
    url: "https://images.unsplash.com/photo-1550645612-83f5d594b671",
    alt: "Bandoo Studio - kontakt",
    description: "Strona kontaktowa z formularzem",
  },
];

export function ProjectGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      
      // Loop back to the beginning/end if out of bounds
      if (newIndex < 0) {
        newIndex = images.length - 1;
      } else if (newIndex >= images.length) {
        newIndex = 0;
      }
      
      return newIndex;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <ScrollAnimation type="slide-up">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          Galeria wybranego projektu
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Przykładowa realizacja strony dla restauracji
        </p>
      </ScrollAnimation>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <ScrollAnimation 
            key={index} 
            type="zoom" 
            delay={index * 0.1}
            className="aspect-square overflow-hidden rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => openModal(index)}
              className="cursor-pointer h-full w-full"
            >
              <img
                src={`${image.url}?auto=format&fit=crop&w=400&h=400&q=80`}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform"
              />
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>

      {/* Modal Gallery */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex flex-col justify-center items-center p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={closeModal}
            >
              <X size={32} />
            </button>

            <div
              className="w-full max-w-4xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col"
                >
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <img
                      src={`${images[currentIndex].url}?auto=format&fit=crop&w=1200&h=675&q=80`}
                      alt={images[currentIndex].alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                    <h3 className="text-lg font-bold dark:text-white">
                      {images[currentIndex].alt}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {images[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-gray-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
