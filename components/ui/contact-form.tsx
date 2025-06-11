"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './input';
import { Button } from './button';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  message: string;
}

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
}

enum SubmitStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.IDLE);
  const [selectedService, setSelectedService] = useState<string>('');

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię jest wymagane';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Niepoprawny adres email';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Wiadomość musi zawierać minimum 10 znaków';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitStatus(SubmitStatus.SUBMITTING);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would send the form data to your backend here
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) throw new Error('Failed to submit form');

      setSubmitStatus(SubmitStatus.SUCCESS);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(SubmitStatus.IDLE);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus(SubmitStatus.ERROR);
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(SubmitStatus.IDLE);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="space-y-8 w-full max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
    >
      <h2 className="text-3xl font-bold text-center dark:text-white">Zamów swoją stronę już dziś</h2>
      
      {submitStatus === SubmitStatus.SUCCESS && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center">
            <CheckCircle className="mr-2" />
            <span>Dziękuję za wiadomość! Odezwę się najszybciej jak to możliwe.</span>
          </div>
        </motion.div>
      )}
      
      {submitStatus === SubmitStatus.ERROR && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center">
            <AlertCircle className="mr-2" />
            <span>Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.</span>
          </div>
        </motion.div>
      )}
      
      <div className="bg-[#f8f5f2] dark:bg-gray-700 p-4 rounded-xl mb-4">
        <h3 className="font-semibold mb-2 text-[#7e5d44] dark:text-[#d3b9a3]">Wybierz pakiet</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {["Mini-Wizytówka", "Mała strona firmowa", "Pełna wersja"].map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => setSelectedService(service)}
              className={`p-3 rounded-lg text-sm border transition-all ${
                selectedService === service
                  ? 'bg-[#7e5d44] text-white border-[#7e5d44]'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Imię i nazwisko
          </label>          <Input 
            id="name"
            name="name"
            placeholder="Twoje imię i nazwisko" 
            value={formData.name}
            onChange={handleChange}
            className={`rounded-xl shadow-sm text-base h-12 px-4 ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            E-mail
          </label>          <Input 
            id="email"
            name="email"
            type="email" 
            placeholder="twoj@email.pl" 
            value={formData.email}
            onChange={handleChange}
            className={`rounded-xl shadow-sm text-base h-12 px-4 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Szczegóły zamówienia
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Opisz swoje potrzeby, pytania lub szczegóły projektu..."
            value={formData.message}
            onChange={handleChange}            rows={6}
            className={`w-full border px-4 py-4 rounded-xl shadow-sm text-base ${errors.message ? 'border-red-500' : ''} dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <Button 
            className="w-full bg-[#7e5d44] hover:bg-[#5f4531] transition-all text-white text-lg py-6 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg" 
            type="submit"
            disabled={submitStatus === SubmitStatus.SUBMITTING}
          >
            {submitStatus === SubmitStatus.SUBMITTING ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wysyłanie...
              </>
            ) : (
              <>
                Wyślij wiadomość <Send size={18} />
              </>
            )}
          </Button>
          
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Możesz również zapłacić od razu za wybraną usługę za pomocą Stripe.
            Twoja strona będzie gotowa w ciągu 3 dni roboczych!
          </div>
        </div>
      </form>
    </motion.div>
  );
}
