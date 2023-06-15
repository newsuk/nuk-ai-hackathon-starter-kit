import './globals.css'
import React from 'react'
import { Metadata } from 'next'
import { usePathname } from 'next/navigation';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const metadata: Metadata = {
  title: 'NewsUK AI Hackathon',
  description: 'Getting started with AI - NewsUK Innovation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const navigation = [
    { name: 'Prototype', href: '/'},
    { name: 'Presentation', href: '/presentation'},
  ]

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        
      <div className="min-h-full">
        <div className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src="/logo.svg" alt="Tech Innovation" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          'text-white hover:bg-tertiary hover:text-primary',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">AI Runner Demo</h1>
          </div>
        </header>
        
        {children}
        </div>
        </body>
    </html>
  );
}
