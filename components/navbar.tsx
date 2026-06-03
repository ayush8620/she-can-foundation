'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Menu, X } from 'lucide-react'
import { UserButton, useAuth } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-purple-500/5 border-b border-purple-100/50 dark:border-purple-900/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              She Can
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}

            {isSignedIn && (
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-200"
              >
                Dashboard
              </Link>
            )}

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />

            <ThemeToggle />

            {!isSignedIn && (
              <Link href="/sign-in">
                <Button
                  variant="default"
                  size="sm"
                  className="ml-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  Admin Login
                </Button>
              </Link>
            )}

            {isSignedIn && (
              <div className="ml-2">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-8 h-8 ring-2 ring-purple-200 dark:ring-purple-800',
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="size-9"
            >
              {isMobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden pb-4"
            >
              <div className="flex flex-col gap-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                {isSignedIn && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                )}

                <div className="px-4 pt-4 pb-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 mt-2">
                  {!isSignedIn ? (
                    <Link href="/sign-in" onClick={() => setIsMobileOpen(false)} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0">
                        Admin Login
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3">
                      <UserButton />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Account
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
