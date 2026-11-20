// Scroll-Triggered 3D Island - Apple-style scroll animations with 3D
// Uses GSAP ScrollTrigger to drive 3D transformations based on scroll position

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  id: string;
  model3d: string;
  title: string;
  category: string;
  href: string;
}

interface ScrollTriggered3DProps {
  slides: Slide[];
  className?: string;
}

// Procedural 3D models for each appliance type
const ApplianceModels: Record<string, () => React.ReactElement> = {
  wolf: () => <WolfRange />,
  subzero: () => <SubZeroFridge />,
  miele: () => <MieleDishwasher />,
  lamarzocco: () => <LaMarzocco />,
  default: () => <GenericAppliance />,
};

function ApplianceModel({ modelType }: { modelType: string }) {
  const Component = ApplianceModels[modelType] || ApplianceModels.default;
  return <Component />;
}

const MATERIALS = {
  premium: {
    color: '#1a1a1a',
    metalness: 0.85,
    roughness: 0.15,
    clearcoat: 0.6,
    clearcoatRoughness: 0.08,
  },
  accent: {
    color: '#B8860B',
    metalness: 1,
    roughness: 0.05,
  },
  glass: {
    color: '#ffffff',
    metalness: 0,
    roughness: 0,
    transmission: 0.95,
    thickness: 0.5,
    ior: 1.5,
  },
  stainless: {
    color: '#e8e8e8',
    metalness: 0.95,
    roughness: 0.15,
  },
};

// Wolf Professional Range
function WolfRange() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.6, 1.9]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      <mesh position={[0, 0.9, 0.96]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.06]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      <mesh position={[0, 0.4, 0.96]} castShadow>
        <boxGeometry args={[1.4, 0.5, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      {[-0.55, -0.18, 0.18, 0.55].map((x, i) => (
        <group key={i} position={[x, 0.85, 1.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 24]} />
            <meshPhysicalMaterial {...MATERIALS.accent} />
          </mesh>
          <mesh position={[0, 0, 0.06]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 12]} />
            <meshPhysicalMaterial {...MATERIALS.accent} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.2, 0.96]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      <mesh position={[0, -0.5, 1.05]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.12]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      {[-0.7, -0.2, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.82, 0]} castShadow>
          <boxGeometry args={[0.6, 0.04, 1.5]} />
          <meshPhysicalMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function SubZeroFridge() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.8, 1.8]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      <mesh position={[-0.5, 0, 0.91]} castShadow>
        <boxGeometry args={[0.95, 2.6, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[0.5, 0, 0.91]} castShadow>
        <boxGeometry args={[0.95, 2.6, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 1.05]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.15]} />
          <meshPhysicalMaterial {...MATERIALS.accent} />
        </mesh>
      ))}
      <mesh position={[0, -1.1, 0.96]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      <mesh position={[0, 1.3, 0.92]} castShadow>
        <boxGeometry args={[0.8, 0.06, 0.06]} />
        <meshPhysicalMaterial color="#00d4ff" metalness={0.8} roughness={0.1} emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function MieleDishwasher() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 1.55, 1.6]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      <mesh position={[0, 0.7, 0.81]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      <mesh position={[0, 0.4, 0.81]} castShadow>
        <boxGeometry args={[1.4, 0.3, 0.04]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      <mesh position={[0, -0.6, 0.85]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      <mesh position={[0, -0.85, 0.82]} castShadow>
        <boxGeometry args={[0.7, 0.05, 0.05]} />
        <meshPhysicalMaterial color="#00d4ff" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0.9]} castShadow>
        <boxGeometry args={[0.05, 0.5, 0.12]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
    </group>
  );
}

function LaMarzocco() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.2, 1.4]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      <mesh position={[0, 0.55, 0.71]} castShadow>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      <mesh position={[0, 0.1, 0.75]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 24]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[0.35, -0.2, 0.9]} castShadow rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[0.45, -0.2, 1.2]} castShadow>
        <torusGeometry args={[0.08, 0.03, 8, 16]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[-0.5, 0.4, 0.6]} castShadow rotation={[-0.4, 0, 0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[0, 0.4, 0.71]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.03]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      <mesh position={[-0.55, 0.4, 0]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.02]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
    </group>
  );
}

function GenericAppliance() {
  return (
    <group>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.5, 1.6]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      <mesh position={[0, 0.6, 0.81]} castShadow>
        <boxGeometry args={[1.0, 0.05, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
    </group>
  );
}

function ModelScene({ modelType, onLoad, scrollProgress }: { modelType: string; onLoad?: () => void; scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
 
  useEffect(() => {
    onLoad?.();
    const group = groupRef.current;
    if (!group) return;
   
    const startTime = performance.now();
    const animate = () => {
      const time = (performance.now() - startTime) * 0.0003;
      if (group) {
        group.rotation.y = scrollProgress * Math.PI * 2 + Math.sin(time) * 0.1;
        group.position.y = Math.cos(time * 0.7) * 0.05;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [scrollProgress, onLoad]);
 
  return (
    <group ref={groupRef}>
      <ApplianceModel modelType={modelType} />
    </group>
  );
}

export default function ScrollTriggered3D({ slides, className = '' }: ScrollTriggered3DProps) {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set());
  const scrollProgressRef = useRef(0);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
 
  useEffect(() => {
    scrollTriggersRef.current.forEach(t => t.kill());
    scrollTriggersRef.current = [];
   
    const masterTrigger = ScrollTrigger.create({
      trigger: '[data-infinite-experience]',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });
    scrollTriggersRef.current.push(masterTrigger);
   
    slides.forEach((slide, index) => {
      const trigger = ScrollTrigger.create({
        trigger: `[data-scroll-section="${slide.id}"]`,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      });
      scrollTriggersRef.current.push(trigger);
    });
   
    return () => {
      scrollTriggersRef.current.forEach(t => t.kill());
    };
  }, [slides]);
 
  const [currentModel, setCurrentModel] = useState(slides[0]?.model3d || 'wolf');
 
  useEffect(() => {
    const sections = slides.map(s => document.querySelector(`[data-scroll-section="${s.id}"]`));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slide = slides.find(s => s.id === entry.target.getAttribute('data-scroll-section'));
          if (slide) setCurrentModel(slide.model3d);
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' });
   
    sections.forEach(section => section && observer.observe(section));
    return () => observer.disconnect();
  }, [slides]);
 
  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 30 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
      >
        <color attach="background" args={['#0a0a0a']} />
       
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[4, 8, 6]} intensity={2.5} color="#fff8e7" castShadow>
          <orthographicCamera attach="shadowCamera" left={-2.5} right={2.5} top={2.5} bottom={-2.5} near={0.1} far={15} />
        </directionalLight>
        <directionalLight position={[-4, 4, -4]} intensity={1} color="#ffd700" />
        <pointLight position={[0, 2, 3]} intensity={1.5} color="#ffd700" decay={2} />
       
        <Environment preset="studio" background={false} ground={false} />
       
        <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={3.5} blur={2} color="#000000" />
       
        <ModelScene modelType={currentModel} onLoad={() => {}} scrollProgress={scrollProgressRef.current} />
      </Canvas>
    </div>
  );
}