import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              'bg-purple-600 hover:bg-purple-700 text-sm normal-case',
            card: 'shadow-xl',
          },
        }}
      />
    </div>
  )
}
