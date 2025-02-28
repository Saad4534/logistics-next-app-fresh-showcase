'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Poppins } from 'next/font/google';
import './globals.css';
import IntroAnimation from '../components/IntroAnimation';
import { AnimatePresence, motion } from 'framer-motion';

// Define Poppins font outside the component
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeComponent, setActiveComponent] = useState<string>('');
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the intro has been shown before
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    } else {
      setShowIntro(true);
    }

    // Apply dark mode
    document.documentElement.classList.add('dark');
  }, []);

  // Manage overflow style on body during intro animation
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'; // Disable scrolling during intro
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling after intro
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showIntro]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true'); // Mark intro as seen
  };

  if (showIntro === null) {
    return null; // Prevent rendering until intro state is determined
  }

  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className="min-h-screen">
        <AnimatePresence>
          {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
        </AnimatePresence>
        {!showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Header activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
            {children}
          </motion.div>
        )}
      </body>
    </html>
  );
}