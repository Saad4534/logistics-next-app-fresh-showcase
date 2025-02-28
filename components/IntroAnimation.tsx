'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Animation for the initial loading effect (e.g., pulsating circle)
  const loaderVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: 2,
        onComplete: () => setShowDisclaimer(true), // Show disclaimer after 3 pulses
      },
    },
  };

  // Animation for the disclaimer text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  // Animation for the button (just the entrance)
  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } },
    hover: { scale: 1.05 },
  };

  // Animation for the arrow (continuous rightward movement)
  const arrowVariants = {
    animate: {
      x: [0, 10, 0],
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  // Animation for exiting the intro
  const introVariants = {
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 z-50"
      variants={introVariants}
      exit="exit"
    >
      {/* Initial Loading Animation */}
      {!showDisclaimer && (
        <motion.div
          className="w-16 h-16 bg-blue-500 rounded-full"
          variants={loaderVariants}
          initial="initial"
          animate={['animate', 'pulse']}
        />
      )}

      {/* Disclaimer and Continue Button */}
      <AnimatePresence>
        {showDisclaimer && (
          <div className="flex flex-col items-center space-y-6">
            {/* Disclaimer Text */}
            <motion.div
              className="text-center text-white max-w-md px-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-lg">
                This is not the actual implementation, this is just a showcase. The responses are fake. More details in the Limitations part of the README file. To view the actual implementation, please visit{' '}
                <a
                  href="https://github.com/saad4534/logistics-microservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline hover:text-blue-300"
                >
                  this repository
                </a>.
              </p>
            </motion.div>

            {/* Continue Button */}
            <motion.button
              className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={onComplete}
            >
              <span className='font-semibold'>Continue</span>
              <motion.div
                variants={arrowVariants}
                animate="animate"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}