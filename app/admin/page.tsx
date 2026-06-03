'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Clock,
  Search,
  ArrowUpDown,
  Trash2,
  AlertTriangle,
  Loader2,
  Inbox,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface Submission {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [todayCount, setTodayCount] = useState(0)
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setSubmissions(data.submissions)
      setTotal(data.total)
      setTodayCount(data.todayCount)
    } catch {
      toast.error('Failed to load submissions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/contact?id=${deleteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      toast.success('Submission deleted')
      setSubmissions((prev) => prev.filter((s) => s.id !== deleteId))
      setTotal((prev) => prev - 1)
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete submission')
    } finally {
      setDeleting(false)
    }
  }

  const filtered = useMemo(() => {
    let result = submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    )
    if (sortOrder === 'oldest') {
      result = [...result].reverse()
    }
    return result
  }, [submissions, search, sortOrder])

  const latestSubmission = submissions[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-gray-950 dark:to-purple-950/10">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-purple-100/50 dark:border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <LayoutDashboard className="w-6 h-6 text-purple-500" />
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage form submissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-purple-100/50 dark:border-purple-900/30 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Submissions</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{total}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-purple-100/50 dark:border-purple-900/30 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Today&apos;s Messages</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{todayCount}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-purple-100/50 dark:border-purple-900/30 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Latest Submission</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {latestSubmission
                    ? new Date(latestSubmission.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'No submissions yet'}
                </p>
              </motion.div>
            </>
          )}
        </div>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="gap-2 shrink-0"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
        </div>

        {/* Submissions Table */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-purple-100/50 dark:border-purple-900/30 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Inbox className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {search ? 'No matching submissions found' : 'No submissions yet'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Message</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {filtered.map((sub) => (
                    <motion.tr
                      key={sub.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {sub.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {sub.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {sub.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {new Date(sub.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDeleteId(sub.id)}
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Submission</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this submission? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="gap-2"
                >
                  {deleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
