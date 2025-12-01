import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Forge App - Meditation Timer',
  description: 'Manage your meditation sessions effectively with Forge App.',
  viewport: 'width=device-width, initial-scale=1',
};

const Layout: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content={metadata.viewport} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <div className="flex flex-col min-h-screen">
          <header className="bg-white shadow-md">
            <nav className="container mx-auto p-4 flex justify-between items-center">
              <div className="text-xl font-semibold">Forge App</div>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-blue-500">Home</a></li>
                <li><a href="/stats" className="hover:text-blue-500">Stats</a></li>
                <li><a href="/profile" className="hover:text-blue-500">Profile</a></li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            <Component {...pageProps} />
          </main>
          <footer className="bg-white shadow-t-md">
            <div className="container mx-auto p-4 text-center">
              <p>© 2023 Forge App. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;