// Premium 3D Product Viewer Island for Featured Products
// Renders in the featured products grid with hover-to-view-3D

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';

// Product model mapping
const PRODUCT_MODELS: Record<string, string> = {
  'wolf-36-dual-fuel-range': '/models/wolf-range.glb',
  'sub-zero-48-pro-french-door': '/models/sub-zero-fridge.glb',
  'miele-g7000-dishwasher': '/models/miele-dishwasher.glb',
  'la-marzocco-linea-micra': '/models/la-marzocco.glb',
};

// Premium material presets
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

// Procedural premium appliance generator
function ApplianceModel({ productHandle }: { productHandle: string }) {
  const type = productHandle.split('-')[0]; // wolf, sub-zero, miele, la-marzocco
  
  switch (type) {
    case 'wolf':
      return <WolfRange />;
    case 'sub-zero':
      return <SubZeroFridge />;
    case 'miele':
      return <MieleDishwasher />;
    case 'la-marzocco':
      return <LaMarzocco />;
    default:
      return <GenericAppliance />;
  }
}

// Wolf Professional Range
function WolfRange() {
  return (
    <group>
      {/* Main cavity */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 1.6, 1.9]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      
      {/* Dual fuel badge */}
      <mesh position={[0, 0.9, 0.96]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.06]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      
      {/* Control panel */}
      <mesh position={[0, 0.4, 0.96]} castShadow>
        <boxGeometry args={[1.4, 0.5, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      
      {/* Professional knobs */}
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
      
      {/* Oven window */}
      <mesh position={[0, -0.2, 0.96]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.02]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0, -0.5, 1.05]} castShadow>
        <boxGeometry args={[0.06, 0.7, 0.12]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      
      {/* Grates */}
      {[-0.7, -0.2, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.82, 0]} castShadow>
          <boxGeometry args={[0.6, 0.04, 1.5]} />
          <meshPhysicalMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Sub-Zero Pro French Door
function SubZeroFridge() {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 2.8, 1.8]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      
      {/* French doors split */}
      <mesh position={[-0.5, 0, 0.91]} castShadow>
        <boxGeometry args={[0.95, 2.6, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[0.5, 0, 0.91]} castShadow>
        <boxGeometry args={[0.95, 2.6, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      
      {/* Handles */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, -0.2, 1.05]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.15]} />
          <meshPhysicalMaterial {...MATERIALS.accent} />
        </mesh>
      ))}
      
      {/* Ice/Water dispenser */}
      <mesh position={[0, -1.1, 0.96]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      
      {/* Air purification badge */}
      <mesh position={[0, 1.3, 0.92]} castShadow>
        <boxGeometry args={[0.8, 0.06, 0.06]} />
        <meshPhysicalMaterial color="#00d4ff" metalness={0.8} roughness={0.1} emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Miele G7000 Dishwasher
function MieleDishwasher() {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 1.55, 1.6]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      
      {/* 3D+ Cutlery tray indicator */}
      <mesh position={[0, 0.7, 0.81]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.05]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      
      {/* Control panel - touch */}
      <mesh position={[0, 0.4, 0.81]} castShadow>
        <boxGeometry args={[1.4, 0.3, 0.04]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      
      {/* AutoOpen hinge visible */}
      <mesh position={[0, -0.6, 0.85]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      
      {/* Quiet badge */}
      <mesh position={[0, -0.85, 0.82]} castShadow>
        <boxGeometry args={[0.7, 0.05, 0.05]} />
        <meshPhysicalMaterial color="#00d4ff" metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0, -0.6, 0.9]} castShadow>
        <boxGeometry args={[0.05, 0.5, 0.12]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
    </group>
  );
}

// La Marzocco Linea Micra
function LaMarzocco() {
  return (
    <group>
      {/* Main body - compact */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.2, 1.4]} />
        <meshPhysicalMaterial {...MATERIALS.premium} />
      </mesh>
      
      {/* Dual boiler indicator */}
      <mesh position={[0, 0.55, 0.71]} castShadow>
        <boxGeometry args={[0.8, 0.04, 0.04]} />
        <meshPhysicalMaterial {...MATERIALS.accent} />
      </mesh>
      
      {/* Group head - saturated */}
      <mesh position={[0, 0.1, 0.75]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.4, 24]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      
      {/* Portafilter */}
      <mesh position={[0.35, -0.2, 0.9]} castShadow rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      <mesh position={[0.45, -0.2, 1.2]} castShadow>
        <torusGeometry args={[0.08, 0.03, 8, 16]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      
      {/* Steam wand */}
      <mesh position={[-0.5, 0.4, 0.6]} castShadow rotation={[-0.4, 0, 0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        <meshPhysicalMaterial {...MATERIALS.stainless} />
      </mesh>
      
      {/* PID display */}
      <mesh position={[0, 0.4, 0.71]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.03]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
      
      {/* Water tank indicator */}
      <mesh position={[-0.55, 0.4, 0]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.02]} />
        <meshPhysicalMaterial {...MATERIALS.glass} />
      </mesh>
    </group>
  );
}

// Generic fallback
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

export default function Product3DViewer({ productHandle = 'wolf-36-dual-fuel-range' }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-full" style={{ width: '100%', height: '100%' }}>
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            <p className="text-white/60 text-xs font-medium">Loading 3D...</p>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 30 }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
        >
          <color attach="background" args={['#0a0a0a']} />
          
          {/* Premium lighting setup */}
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight position={[4, 8, 6]} intensity={2.5} color="#fff8e7" castShadow>
            <orthographicCamera attach="shadowCamera" left={-2.5} right={2.5} top={2.5} bottom={-2.5} near={0.1} far={15} />
          </directionalLight>
          <directionalLight position={[-4, 4, -4]} intensity={1} color="#ffd700" />
          <pointLight position={[0, 2, 3]} intensity={1.5} color="#ffd700" decay={2} />
          
          <Environment preset="studio" background={false} ground={false} />
          
          <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={3.5} blur={2} color="#000000" />
          
          <ProductScene productHandle={productHandle} onLoad={() => setLoaded(true)} scrollProgress={0} />
        </Canvas>
      </Suspense>
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/90 backdrop-blur-sm z-10 transition-opacity duration-500">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-3 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            <p className="text-white/50 text-xs font-medium">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}