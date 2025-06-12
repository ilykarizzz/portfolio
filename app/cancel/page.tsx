"use client";

import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0eb] via-[#e7d9cb] to-[#c9b5a1] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-black dark:text-white flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Płatność anulowana</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Twoja płatność została anulowana. Jeśli masz pytania lub potrzebujesz pomocy, skontaktuj się z nami.
        </p>
        <Link href="/" className="inline-block bg-[#7e5d44] hover:bg-[#5f4531] text-white px-6 py-3 rounded-lg transition-colors">
          Powrót do strony głównej
        </Link>
      </motion.div>
    </div>
  );
}