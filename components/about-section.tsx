'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Lightbulb, Globe, TrendingUp } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To empower women by providing access to quality education, professional development, and leadership opportunities that transform lives and communities.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We leverage modern technology and innovative approaches to deliver impactful programs that reach women in underserved areas worldwide.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'Our programs span across 50+ communities worldwide, fostering a network of empowered women who lead change in their regions.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Impact',
    description:
      'Every initiative is designed with clear metrics and goals, ensuring transparency and accountability in our mission to uplift women.',
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Building a Future Where{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Every Woman Thrives
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            She Can Foundation believes in the transformative power of opportunity.
            We work tirelessly to break down barriers and create pathways for women
            to achieve their full potential.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-purple-50/50 dark:from-gray-900 dark:to-purple-950/30 border border-purple-100/50 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 group-hover:scale-110 transition-all duration-300">
                <value.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>

              {/* Decorative corner gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-bl from-purple-100/40 dark:from-purple-900/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Impact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Together, We Can Make a Difference
            </h3>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              Every message you send helps us understand how we can better serve our
              community. Reach out and be part of the change.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
