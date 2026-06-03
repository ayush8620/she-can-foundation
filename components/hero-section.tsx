'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Users, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-300/10 to-pink-300/10 blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Empowering Women Everywhere
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-gray-900 dark:text-white">Empowering Women</span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
              Through Opportunity
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">& Education</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            She Can Foundation is dedicated to breaking barriers and creating pathways
            for women to thrive in education, careers, and leadership roles across the globe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#contact">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-300"
              >
                Learn More
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-12"
          >
            {[
              { icon: Users, value: '10,000+', label: 'Women Empowered' },
              { icon: GraduationCap, value: '500+', label: 'Scholarships Given' },
              { icon: Heart, value: '50+', label: 'Communities Reached' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-purple-100/50 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-purple-500 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-white dark:fill-gray-950"
          />
        </svg>
      </div>
    </section>
  )
}
