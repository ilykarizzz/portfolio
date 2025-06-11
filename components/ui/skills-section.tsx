"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation } from './scroll-animation';

type Skill = {
  name: string;
  icon: string;
  level: number; // 1-10
};

const skills: Skill[] = [
  { name: "Responsive Design", icon: "🖥️", level: 10 },
  { name: "UI/UX Design", icon: "🎨", level: 9 },
  { name: "HTML5", icon: "📝", level: 10 },
  { name: "CSS3/SASS", icon: "🎭", level: 9 },
  { name: "JavaScript", icon: "📱", level: 9 },
  { name: "React", icon: "⚛️", level: 8 },
  { name: "Next.js", icon: "🔄", level: 8 },
  { name: "CMS Integration", icon: "🔌", level: 7 },
  { name: "WordPress", icon: "📰", level: 8 },
  { name: "SEO Optimization", icon: "🔍", level: 9 },
  { name: "Performance Optimization", icon: "⚡", level: 8 },
  { name: "Hosting & Deployment", icon: "☁️", level: 7 }
];

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto my-12">
      <ScrollAnimation type="slide-up">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Moje umiejętności</h2>
      </ScrollAnimation>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {skills.map((skill, index) => (
          <ScrollAnimation 
            key={skill.name}
            type="zoom"
            delay={index * 0.1}
            className="h-full"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full flex flex-col items-center justify-between text-center cursor-pointer card-gradient"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              onClick={() => setActiveSkill(activeSkill === index ? null : index)}
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level * 10}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-[#7e5d44] dark:bg-[#d3b9a3] h-2 rounded-full"
                />
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}
