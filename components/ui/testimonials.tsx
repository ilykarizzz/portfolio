"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card } from './card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Testimonial = {
  name: string;
  company: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Anna Kowalska",
    company: "Kwiaciarnia Floris",
    text: "Strona internetowa, którą otrzymałam, przekroczyła moje oczekiwania! Jest piękna, intuicyjna i przyciąga nowych klientów."
  },
  {
    name: "Jan Nowak",
    company: "Auto Serwis",
    text: "Profesjonalna współpraca od początku do końca. Strona działa szybko, wygląda nowocześnie i jest świetnie zoptymalizowana."
  },
  {
    name: "Marta Wiśniewska",
    company: "Kancelaria Prawna",
    text: "Nasza kancelaria potrzebowała eleganckiej i funkcjonalnej strony - otrzymaliśmy dokładnie to, czego oczekiwaliśmy. Polecam."
  },
  {
    name: "Piotr Zieliński",
    company: "Restauracja Smaki",
    text: "Dzięki nowej stronie internetowej nasze rezerwacje wzrosły o 30%. Świetna responsywność i design!"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    controls.start({
      opacity: [1, 0, 1],
      x: [0, 20, 0],
      transition: { duration: 0.8 }
    });
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 400);
  };

  const prevTestimonial = () => {
    controls.start({
      opacity: [1, 0, 1],
      x: [0, -20, 0],
      transition: { duration: 0.8 }
    });
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, 400);
  };

  useEffect(() => {
    // Auto-rotate testimonials every 5 seconds
    intervalRef.current = setInterval(nextTestimonial, 5000);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Co mówią o mnie klienci</h2>
      
      <div className="relative">
        <motion.div animate={controls} className="px-4">
          <Card className="shadow-lg bg-white dark:bg-gray-800 dark:text-white">
            <div className="p-6 text-center">
              <p className="text-lg mb-6 italic">"{testimonials[currentIndex].text}"</p>
              <p className="font-semibold">{testimonials[currentIndex].name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[currentIndex].company}</p>
            </div>
          </Card>
        </motion.div>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={prevTestimonial} 
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:shadow-lg transition-all"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={20} className="dark:text-white" />
          </button>
          
          <div className="flex gap-2 items-center">
            {testimonials.map((_, index) => (
              <span 
                key={index}
                className={`block w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-[#7e5d44]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextTestimonial}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:shadow-lg transition-all"
            aria-label="Next testimonial"
          >
            <ArrowRight size={20} className="dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
