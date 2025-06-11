"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
  loop?: boolean;
  pauseAfter?: number;
}

export function Typewriter({
  text,
  delay = 80,
  className = '',
  cursor = true,
  onComplete,
  loop = false,
  pauseAfter = 2000
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        if (loop) setIsDeleting(true);
      }, pauseAfter);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(0);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, delay / 2); // Faster deletion
    } else {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay);
      } else {
        setIsComplete(true);
        if (onComplete) onComplete();
        
        if (loop) {
          timeout = setTimeout(() => {
            setIsPaused(true);
          }, pauseAfter);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, displayText, isDeleting, loop, onComplete, pauseAfter, text, isPaused, isComplete]);

  return (
    <span className={className}>
      {displayText}
      {(cursor && !isComplete) || (cursor && loop) ? (
        <span className="animate-pulse">|</span>
      ) : null}
    </span>
  );
}
