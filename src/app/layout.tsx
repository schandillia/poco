import Navbar from '@/components/Navbar'
// import Providers from '@/components/Providers'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import './globals.css'

// import 'react-loading-skeleton/dist/skeleton.css'
// import 'simplebar-react/dist/simplebar.min.css'

// import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'create next app',
  description: 'generated by Amit'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='light'>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          inter.className
        )}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}