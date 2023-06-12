import './globals.css'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NewsUK AI Hackathon',
  description: 'Getting started with AI - NewsUK Innovation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">{children}</body>
    </html>
  );
}
