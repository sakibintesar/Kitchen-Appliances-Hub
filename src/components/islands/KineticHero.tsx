// Kinetic Hero Island - SVG Text Warping + Torn Page Anchor + Scroll-Triggered 3D
// Serotonin-inspired editorial hero with kinetic typography and torn page vertical anchor

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KineticTypography from './KineticTypography.tsx';

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  id: string;
  image: string;
  alt: string;
  badge: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  accentColor: string;
  productHandle: string;
  model3d: string;
}

interface KineticHeroProps {
  slides: Slide[];
  className?: string;
}

export default function KineticHero({ slides, className = '' }: KineticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content on scroll
      gsap.to('.hero-content', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-immersive-hero]',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Parallax for background slides
      gsap.to('[data-hero-slide]', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-immersive-hero]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const AUTO_SLIDE_DELAY = 8000;

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    interval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={`relative w-full min-h-screen ${className}`} data-immersive-hero ref={containerRef}>
      {/* Torn Page Vertical Anchor (Serotonin-inspired) */}
      <div className="absolute inset-0 pointer-events-none -z-5" aria-hidden="true">
        <svg className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" viewBox="0 0 2 100" preserveAspectRatio="none">
          <defs>
            <filter id="tornEdge" x="-50%" y="0" width="200%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.005" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <path 
            d="M1,0 Q1,50 0.5,50 Q0,50 0,50 Q-0.5,50 0,50 Q0.5,50 1,50 Q1.5,50 1,50 L1,100 L0,100 L0,0 Z"
            fill="url(#tornGradient)"
            filter="url(#tornEdge)"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="tornGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B8860B" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-32 lg:py-48">
          <div className="max-w-5xl" data-hero-content>
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1200 ease-out ${i === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                data-hero-slide={String(i)}
                style={{ background: `linear-gradient(135deg, ${slide.accentColor}, transparent 50%)` }}
              >
                <div className="mb-6 flex items-center gap-3 animate-fade-up" style={{animationDelay: `${i === currentSlide ? 0 : 200}ms`}}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-medium text-white backdrop-blur border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                    {slide.eyebrow}
                  </span>
                </div>
                
                <KineticTypography
                  text={slide.title}
                  className={`animate-slide-up ${i === currentSlide ? 'animation-delay-100' : 'animation-delay-300'}`}
                  fontSize="clamp(44px, 8vw, 84px)"
                  fontWeight="900"
                  color="#ffffff"
                  warpIntensity={1.2}
                  pathType="wave"
                />
                
                <p className="mt-6 text-[clamp(20px,3.5vw,28px)] leading-relaxed text-white/80 max-w-[60ch] animate-slide-up" style={{animationDelay: `${i === currentSlide ? 200 : 400}ms`}}>
                  {slide.subtitle}
                </p>
                
                <div className="mt-12 flex flex-wrap gap-4 animate-slide-up" style={{animationDelay: `${i === currentSlide ? 300 : 500}ms`}}>
                  <a
                    href={slide.cta.href}
                    className="group inline-flex items-center gap-2 rounded-2xl bg-white px-10 py-5 text-[17px] font-semibold text-neutral-900 hover:bg-gold-50 hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] transition-all duration-500"
                  >
                    {slide.cta.label}
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-2 group-hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                  <a
                    href="/collections"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/5 px-10 py-5 text-[17px] font-semibold text-white hover:bg-white/10 transition-all duration-500 backdrop-blur"
                  >
                    View All Collections
                  </a>
                </div>
                
                <p className="mt-10 text-[16px] text-white/60 animate-fade-up" style={{animationDelay: `${i === currentSlide ? 400 : 600}ms`}}>
                  Free shipping on orders over $500 · White-glove delivery & installation · 2-year warranty
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20" data-hero-dots>
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            data-dot={String(i)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-white w-14' : 'bg-white/40 hover:bg-white/60'}`}
            aria-label={`View ${slide.eyebrow}`}
            aria-current={i === currentSlide ? 'true' : 'false'}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="text-white/60">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}