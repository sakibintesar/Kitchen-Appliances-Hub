// Premium Fluid Cursor Island
// GSAP quickTo for 60fps magnetic cursor with premium feel

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const magneticTargetsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Ultra-smooth interpolators using gsap.quickTo
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    // Follower with slight lag for premium feel
    const fxTo = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power2.out' });
    const fyTo = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power2.out' });
    const fScaleTo = gsap.quickTo(follower, 'scale', { duration: 0.4, ease: 'elastic.out(1, 0.5)' });

    let mouseX = 0;
    let mouseY = 0;
    let isMagnetic = false;
    let magneticTarget: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Main cursor - immediate
      xTo(mouseX - 8);
      yTo(mouseY - 8);

      // Follower - delayed for premium feel
      fxTo(mouseX - 16);
      fyTo(mouseY - 16);
    };

    const handleMagneticEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-magnetic]') as HTMLElement;

      if (magneticEl) {
        isMagnetic = true;
        magneticTarget = magneticEl;

        const strength = parseFloat(magneticEl.dataset.magneticStrength || '1.5');
        const scale = parseFloat(magneticEl.dataset.magneticScale || '2');

        gsap.to(cursor, {
          scale: scale,
          borderColor: '#B8860B',
          backgroundColor: 'rgba(184, 134, 11, 0.15)',
          boxShadow: '0 0 30px rgba(184, 134, 11, 0.4)',
          duration: 0.3,
          ease: 'power2.out'
        });

        gsap.to(follower, {
          scale: scale * 1.5,
          borderColor: 'rgba(184, 134, 11, 0.5)',
          backgroundColor: 'rgba(184, 134, 11, 0.05)',
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        });

        // Magnetic pull effect
        const pullX = (mouseX - (magneticEl.getBoundingClientRect().left + magneticEl.offsetWidth / 2)) * 0.3 * strength;
        const pullY = (mouseY - (magneticEl.getBoundingClientRect().top + magneticEl.offsetHeight / 2)) * 0.3 * strength;

        gsap.to(cursor, {
          x: `+=${pullX}`,
          y: `+=${pullY}`,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-magnetic]');

      if (magneticEl && isMagnetic) {
        isMagnetic = false;
        magneticTarget = null;

        gsap.to(cursor, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.6)',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.out'
        });

        gsap.to(follower, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'transparent',
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    };

    const handleClick = () => {
      gsap.to(cursor, {
        scale: 0.7,
        duration: 0.08,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });

      gsap.to(follower, {
        scale: 0.5,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMagneticEnter, { passive: true });
    window.addEventListener('mouseout', handleMagneticLeave, { passive: true });
    window.addEventListener('mousedown', handleClick, { passive: true });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
    });

    document.addEventListener('mouseenter', () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMagneticEnter);
      window.removeEventListener('mouseout', handleMagneticLeave);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      {/* Main cursor - immediate response */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 border-2 border-white/60 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      >
        <div className="w-full h-4 rounded-full bg-white/10" />
      </div>

      {/* Follower - delayed for premium feel */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-transform will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      />
    </>
  );
}