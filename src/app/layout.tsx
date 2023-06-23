import './globals.scss'

import React from 'react'

import { Inter } from 'next/font/google'

const inter = Inter({ weight: 'variable', subsets: ['latin'] })

export const metadata = {
  title: 'Movie Nights',
  description: 'Movie Nights for assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
