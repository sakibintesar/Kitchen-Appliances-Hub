// Kinetic Typography Island - SVG Text Path Warping on Pointer Velocity
// Serotonin-inspired dynamic text that warps based on cursor movement

import { useRef, useEffect, useState } from 'react';

interface KineticTypographyProps {
  text: string;
  className?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  warpIntensity?: number;
  pathType?: 'wave' | 'circle' | 'line' | 'bezier';
}

export default function KineticTypography({ 
  text, 
  className = '', 
  fontSize = 'clamp(48px, 10vw, 120px)',
  fontWeight = '900',
  color = '#ffffff',
  warpIntensity = 1,
  pathType = 'wave'
}: KineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number>();

  // Generate SVG path based on type
  const generatePath = (width: number, height: number, mouseX: number, mouseY: number, velX: number, velY: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const amplitude = 30 * warpIntensity;
    const frequency = 0.02;
    
    // Apply velocity influence
    const velInfluenceX = velX * 50 * warpIntensity;
    const velInfluenceY = velY * 50 * warpIntensity;
    
    // Mouse position influence (normalized 0-1)
    const mouseInfluenceX = (mouseX - 0.5) * 100 * warpIntensity;
    const mouseInfluenceY = (mouseY - 0.5) * 60 * warpIntensity;

    switch (pathType) {
      case 'wave': {
        // Horizontal wave path
        let path = `M 0 ${centerY} `;
        const steps = 50;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * width;
          const progress = i / steps;
          const waveOffset = Math.sin(progress * Math.PI * 4 + mouseX * Math.PI * 2) * amplitude;
          const velOffset = Math.sin(progress * Math.PI * 8) * velInfluenceX * 0.5;
          const y = centerY + waveOffset + velOffset + mouseInfluenceY * Math.sin(progress * Math.PI * 2);
          path += `L ${x} ${y} `;
        }
        return path;
      }
      case 'circle': {
        // Circular path with distortion
        const radius = Math.min(width, height) * 0.35;
        let path = '';
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2;
          const distortion = Math.sin(angle * 4 + mouseX * Math.PI * 4) * amplitude * 0.5;
          const velDistortion = Math.sin(angle * 6) * velInfluenceX * 0.3;
          const r = radius + distortion + velDistortion + mouseInfluenceY * 0.5;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) path += `M ${x} ${y} `;
          else path += `L ${x} ${y} `;
        }
        path += 'Z';
        return path;
      }
      case 'bezier': {
        // Bezier curve path with control points influenced by mouse
        const cp1x = width * 0.25 + mouseInfluenceX * 0.5;
        const cp1y = centerY - amplitude + velInfluenceY;
        const cp2x = width * 0.75 + mouseInfluenceX * 0.5;
        const cp2y = centerY + amplitude + velInfluenceY;
        
        return `M 0 ${centerY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${width} ${centerY}`;
      }
      default: {
        // Straight line with subtle wave
        let path = `M 0 ${centerY} `;
        const steps = 30;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * width;
          const progress = i / steps;
          const waveOffset = Math.sin(progress * Math.PI * 2 + mouseX * Math.PI) * amplitude * 0.3;
          const velOffset = Math.sin(progress * Math.PI * 4) * velInfluenceX * 0.2;
          const y = centerY + waveOffset + velOffset;
          path += `L ${x} ${y} `;
        }
        return path;
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Calculate velocity
      const vx = x - lastMousePos.current.x;
      const vy = y - lastMousePos.current.y;
      
      setMousePos({ x, y });
      setVelocity({ x: vx, y: vy });
      lastMousePos.current = { x, y };
    };

    const handleMouseLeave = () => {
      // Smoothly return to center
      const returnToCenter = () => {
        const dx = 0.5 - lastMousePos.current.x;
        const dy = 0.5 - lastMousePos.current.y;
        if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
          lastMousePos.current = { x: 0.5, y: 0.5 };
          setMousePos({ x: 0.5, y: 0.5 });
          setVelocity({ x: 0, y: 0 });
          return;
        }
        lastMousePos.current.x += dx * 0.1;
        lastMousePos.current.y += dy * 0.1;
        setMousePos(lastMousePos.current);
        setVelocity({ x: dx * 0.1, y: dy * 0.1 });
        animationFrameRef.current = requestAnimationFrame(returnToCenter);
      };
      animationFrameRef.current = requestAnimationFrame(returnToCenter);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Animation loop for path updates
  useEffect(() => {
    const animate = () => {
      if (svgRef.current && pathRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPath = generatePath(
          rect.width, 
          rect.height, 
          mousePos.x, 
          mousePos.y, 
          velocity.x, 
          velocity.y
        );
        pathRef.current.setAttribute('d', newPath);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePos, velocity, warpIntensity, pathType]);

  const textId = `kinetic-text-${Math.random().toString(36).substr(2, 9)}`;
  const pathId = `kinetic-path-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      ref={containerRef} 
      className={`relative inline-block ${className}`}
      style={{ fontSize, fontWeight, color }}
      aria-label={text}
    >
      <svg 
        ref={svgRef} 
        className="block" 
        style={{ width: '100%', height: '1.2em', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <path 
            ref={pathRef} 
            id={pathId} 
            fill="none" 
            stroke="none" 
          />
        </defs>
        <text style={{ fontSize, fontWeight, fill: color }}>
          <textPath 
            ref={textPathRef} 
            href={`#${pathId}`} 
            startOffset="50%" 
            textAnchor="middle"
            side="auto"
          >
            {text}
          </textPath>
        </text>
      </svg>
      
      {/* Fallback for accessibility */}
      <span className="sr-only">{text}</span>
    </div>
  );
}