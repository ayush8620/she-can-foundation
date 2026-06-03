import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | She Can Foundation',
  description: 'Manage form submissions and view analytics.',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
