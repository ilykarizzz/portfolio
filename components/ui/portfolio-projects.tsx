"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './card';
import { Button } from './button';
import { ExternalLink } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  category: string[];
  imageUrl: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kwiaciarnia Floris",
    description: "Strona firmowa dla lokalnej kwiaciarni z galerią produktów i formularzem zamówień.",
    category: ["business", "ecommerce"],
    imageUrl: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&q=80&w=400&h=300",
    link: "#"
  },
  {
    id: 2,
    title: "Kancelaria Prawna LexPro",
    description: "Profesjonalna strona dla kancelarii prawnej z systemem rezerwacji konsultacji.",
    category: ["business", "service"],
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=300",
    link: "#"
  },
  {
    id: 3,
    title: "Restauracja Smaki",
    description: "Strona z menu, galerią dań oraz systemem rezerwacji stolików online.",
    category: ["business", "restaurant"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400&h=300",
    link: "#"
  },
  {
    id: 4,
    title: "Auto Serwis",
    description: "Witryna dla warsztatu samochodowego z prezentacją usług i możliwością rezerwacji.",
    category: ["business", "service"],
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400&h=300",
    link: "#"
  },
  {
    id: 5,
    title: "Fotograf Portretowy",
    description: "Portfolio dla fotografa z galerią i systemem rezerwacji sesji.",
    category: ["portfolio", "photography"],
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400&h=300", 
    link: "#"
  },
  {
    id: 6,
    title: "Studio Jogi",
    description: "Witryna z harmonogramem zajęć i możliwością zapisu na zajęcia jogi.",
    category: ["business", "fitness"],
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400&h=300",
    link: "#"
  },
];

export function PortfolioProjects() {
  const [filter, setFilter] = useState("all");
  const categories = ["all", "business", "ecommerce", "portfolio", "service", "restaurant", "photography", "fitness"];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(filter));

  return (
    <div className="w-full my-16">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Moje realizacje</h2>
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
              filter === category 
                ? 'bg-[#7e5d44] text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-all dark:bg-gray-800">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-[#7e5d44] dark:text-[#d3b9a3]">{project.title}</h3>
                  <p className="text-gray-700 mb-4 flex-1 dark:text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.map(cat => (
                      <span 
                        key={cat} 
                        className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full capitalize"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-[#7e5d44] hover:text-[#5f4531] font-medium dark:text-[#d3b9a3]"
                    >
                      Zobacz stronę <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
