'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, User, Mail, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong')
      }

      toast.success('Form Submitted Successfully', {
        description: 'Thank you for reaching out! We\'ll get back to you soon.',
      })
      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 4000)
    } catch (error) {
      toast.error('Submission Failed', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-950 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Send Us a{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Message
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions or want to get involved? We&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl border border-purple-100/50 dark:border-purple-900/30 shadow-xl shadow-purple-500/5">
            {/* Success overlay */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                </motion.div>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Form Submitted Successfully</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">We&apos;ll be in touch soon!</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-purple-500" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register('name')}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                      errors.name
                        ? 'border-red-300 dark:border-red-800 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-700 focus:ring-purple-500/20 focus:border-purple-400 dark:focus:border-purple-500'
                    } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-4 transition-all duration-200`}
                  />
                </div>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-purple-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                      errors.email
                        ? 'border-red-300 dark:border-red-800 focus:ring-red-500/20'
                        : 'border-gray-200 dark:border-gray-700 focus:ring-purple-500/20 focus:border-purple-400 dark:focus:border-purple-500'
                    } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-4 transition-all duration-200`}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <MessageSquare className="w-4 h-4 text-purple-500" />
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us how we can help or how you'd like to contribute..."
                  {...register('message')}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border ${
                    errors.message
                      ? 'border-red-300 dark:border-red-800 focus:ring-red-500/20'
                      : 'border-gray-200 dark:border-gray-700 focus:ring-purple-500/20 focus:border-purple-400 dark:focus:border-purple-500'
                  } text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-4 transition-all duration-200 resize-none`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
