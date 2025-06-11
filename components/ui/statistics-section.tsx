"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Server, Users, Award, Clock } from 'lucide-react';
import { ScrollAnimation } from './scroll-animation';

type Statistic = {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
};

const statistics: Statistic[] = [
  {
    icon: <Users className="w-8 h-8 text-[#7e5d44] dark:text-[#d3b9a3]" />,
    value: 98,
    label: "Zadowolonych klientów",
    suffix: "%",
  }
];

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16); // 16ms per frame at 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [inView, target]);
  
  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatisticsSection() {
  return (
    <div className="w-full py-16 bg-gray-100 dark:bg-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <ScrollAnimation type="slide-up">
          <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">Moje osiągnięcia</h2>
        </ScrollAnimation>
          <div className="flex justify-center">
          {statistics.map((stat, i) => (
            <ScrollAnimation
              key={i}
              type="zoom"
              delay={i * 0.15}
            >
              <div className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-xs mx-auto border border-gray-100 dark:border-gray-700">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-4xl md:text-5xl font-bold text-[#7e5d44] dark:text-[#d3b9a3]">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-3 text-center font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
}
