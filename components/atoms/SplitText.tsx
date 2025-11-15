'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Try to import ScrollTrigger (premium plugin)
let ScrollTrigger: any = null;
if (typeof window !== 'undefined') {
  try {
    ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    console.warn('ScrollTrigger not available. Install it for scroll-based animations.');
  }
}

interface SplitTextOptions {
  type?: string;
  linesClass?: string;
  wordsClass?: string;
}

interface SplitTextResult {
  words: HTMLElement[];
  lines: HTMLElement[];
  chars: HTMLElement[];
}

class SplitTextInstance {
  private element: HTMLElement;
  private options: SplitTextOptions;
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  public chars: HTMLElement[] = [];

  constructor(element: HTMLElement | string, options: SplitTextOptions = {}) {
    this.options = {
      type: options.type || 'words',
      linesClass: options.linesClass || 'lines-js',
      wordsClass: options.wordsClass || 'word-js',
    };

    if (typeof element === 'string') {
      const el = document.querySelector<HTMLElement>(element);
      if (!el) throw new Error(`Element not found: ${element}`);
      this.element = el;
    } else {
      this.element = element;
    }

    this.split();
  }

  private split() {
    const text = this.element.textContent || '';
    const words = text.trim().split(/\s+/);
    
    // Clear element
    this.element.innerHTML = '';

    // Split into words and lines
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = this.options.wordsClass || 'word-js';
      wordSpan.style.display = 'inline-block';
      wordSpan.textContent = word;
      
      this.element.appendChild(wordSpan);
      this.words.push(wordSpan);

      // Add space after word (except last)
      if (wordIndex < words.length - 1) {
        const space = document.createTextNode(' ');
        this.element.appendChild(space);
      }
    });

    // Handle lines if type includes 'lines'
    if (this.options.type?.includes('lines')) {
      this.createLines();
    }
  }

  private createLines() {
    // Get all words
    const words = Array.from(this.element.querySelectorAll(`.${this.options.wordsClass}`)) as HTMLElement[];
    
    if (words.length === 0) return;

    // Measure word positions to determine which line they're on
    const wordPositions = words.map(word => ({
      element: word,
      top: word.offsetTop,
    }));

    // Group words by their top position (same top = same line)
    const lineGroups: HTMLElement[][] = [];
    let currentLineTop = -1;
    let currentLineIndex = -1;

    wordPositions.forEach(({ element, top }) => {
      if (Math.abs(top - currentLineTop) > 1) {
        // New line (allow 1px tolerance for subpixel rendering)
        currentLineTop = top;
        currentLineIndex++;
        lineGroups[currentLineIndex] = [];
      }
      lineGroups[currentLineIndex].push(element);
    });

    // Clear element and rebuild with line containers
    this.element.innerHTML = '';

    lineGroups.forEach((lineWords, lineIndex) => {
      const lineContainer = document.createElement('div');
      lineContainer.className = this.options.linesClass || 'lines-js';
      lineContainer.style.overflow = 'hidden';
      lineContainer.style.display = 'block';

      lineWords.forEach((word, wordIndex) => {
        lineContainer.appendChild(word);
        
        // Add space after word if not last word in line
        if (wordIndex < lineWords.length - 1) {
          lineContainer.appendChild(document.createTextNode(' '));
        }
      });

      this.element.appendChild(lineContainer);
      this.lines.push(lineContainer);
    });
  }

  revert() {
    // Restore original text
    const text = this.words.map(w => w.textContent).join(' ');
    this.element.textContent = text;
    this.words = [];
    this.lines = [];
    this.chars = [];
  }
}

interface SplitTextComponentProps {
  children: React.ReactNode;
  className?: string;
  options?: SplitTextOptions;
  animationOptions?: {
    scrollTrigger?: {
      start?: string;
      trigger?: string | HTMLElement;
    };
    duration?: number;
    yPercent?: number;
    ease?: string;
    stagger?: number;
    delay?: number;
  };
}

export function SplitTextComponent({ 
  children, 
  className = '', 
  options = { type: 'lines,words', linesClass: 'lines-js', wordsClass: 'word-js' },
  animationOptions = {}
}: SplitTextComponentProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<SplitTextInstance | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Create SplitText instance
    splitTextRef.current = new SplitTextInstance(elementRef.current, options);
    const words = splitTextRef.current.words;

    // Set initial state
    gsap.set(words, {
      yPercent: animationOptions.yPercent ?? 100,
    });

    // Create animation config
    const animConfig: any = {
      yPercent: 0,
      duration: animationOptions.duration ?? 1.8,
      ease: animationOptions.ease ?? 'expo.out',
      stagger: animationOptions.stagger ?? 0.06,
    };

    if (animationOptions.delay !== undefined) {
      animConfig.delay = animationOptions.delay;
    }

    // Add ScrollTrigger if provided and available
    if (animationOptions.scrollTrigger && ScrollTrigger) {
      animConfig.scrollTrigger = {
        start: animationOptions.scrollTrigger.start ?? 'top 50%',
        trigger: animationOptions.scrollTrigger.trigger || elementRef.current,
      };
    }

    // Animate
    gsap.to(words, animConfig);

    // Cleanup
    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      gsap.killTweensOf(words);
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.vars.trigger === elementRef.current || 
              (typeof animationOptions.scrollTrigger?.trigger === 'string' && 
               trigger.vars.trigger === document.querySelector(animationOptions.scrollTrigger.trigger))) {
            trigger.kill();
          }
        });
      }
    };
  }, [children, options, animationOptions]);

  return (
    <div ref={elementRef} className={className} aria-hidden>
      {children}
    </div>
  );
}

// Legacy component for backward compatibility
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = '', delay = 0 }: SplitTextProps) {
  return (
    <SplitTextComponent
      className={className}
      options={{ type: 'lines,words', linesClass: 'lines-js', wordsClass: 'word-js' }}
      animationOptions={{
        duration: 1.8,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.06,
        delay: delay,
        scrollTrigger: {
          start: 'top 50%',
        },
      }}
    >
      {text}
    </SplitTextComponent>
  );
}

