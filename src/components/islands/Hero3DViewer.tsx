// Premium 3D Product Viewer Island for Hero
// Uses React Three Fiber + Drei via Astro island (client:load)

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';

// Product model mapping - using GLTF models
const PRODUCT_MODELS: Record<string, string> = {
  'wolf-36-dual-fuel-range': '/models/wolf-range.glb',
  'sub-zero-48-pro-french-door': '/models/sub-zero-fridge.glb',
  'miele-g7000-dishwasher': '/models/miele-dishwasher.glb',
  'la-marzocco-linea-micra': '/models/la-marzocco.glb',
};

// Fallback procedural models for demo
function ProductModel({ productHandle }: { productHandle: string }) {
  const modelUrl = PRODUCT_MODELS[productHandle];

  if (modelUrl) {
    const { scene } = useGLTF(modelUrl);
    return <primitive object={scene} scale={1.5} />;
  }

  // Procedural fallback - premium appliance aesthetic
  return (
    <group>
      {/* Main body */}
      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 1.5, 1.8]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.5}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Accent strip */}
      <mesh position={[0, 0.85, 0.95]} castShadow>
        <boxGeometry args={[1.8, 0.08, 0.08]} />
        <meshPhysicalMaterial color="#B8860B" metalness={1} roughness={0} />
      </mesh>

      {/* Control panel */}
      <mesh position={[0, 0.3, 0.95]} castShadow>
        <boxGeometry args={[1.2, 0.6, 0.06]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Knobs */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 1.05]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshPhysicalMaterial color="#B8860B" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Handle */}
      <mesh position={[0, -0.3, 0.95]} castShadow>
        <boxGeometry args={[0.06, 0.6, 0.15]} />
        <meshPhysicalMaterial color="#B8860B" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

function ProductScene({ productHandle, onLoad }: { productHandle: string; onLoad?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    onLoad?.();
    const group = groupRef.current;
    if (!group) return;

    // Subtle floating animation
    const startTime = performance.now();
    const animate = () => {
      const time = (performance.now() - startTime) * 0.0003;
      if (group) {
        group.rotation.y = Math.sin(time) * 0.15;
        group.position.y = Math.cos(time * 0.7) * 0.05;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [onLoad]);

  return (
    <group ref={groupRef}>
      <ProductModel productHandle={productHandle} />
    </group>
  );
}

export default function Hero3DViewer() {
  const productHandle = 'wolf-36-dual-fuel-range'; // Default
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0">
      <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" /></div>}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35 }}
          style={{ width: '100%', height: '100%' }}
          onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
        >
          <color attach="background" args={['#0a0a0a']} />

          {/* Lighting */}
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight position={[5, 10, 7]} intensity={2} color="#fff8e7" castShadow>
            <orthographicCamera attach="shadowCamera" left={-3} right={3} top={3} bottom={-3} near={0.1} far={20} />
          </directionalLight>
          <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#ffd700" />
          <pointLight position={[0, 3, 3]} intensity={1} color="#ffd700" decay={2} />

          {/* Environment */}
          <Environment
            preset="studio"
            background={false}
            ground={false}
          />

          {/* Ground shadow */}
          <ContactShadows position={[0, -1.2, 0]} opacity={0.3} scale={4} blur={2} color="#000000" />

          {/* Product */}
          <ProductScene productHandle={productHandle} onLoad={() => setLoaded(true)} />
        </Canvas>
      </Suspense>

      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm z-10 transition-opacity duration-500">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            <p className="text-white/60 text-sm font-medium">Loading 3D experience...</p>
          </div>
        </div>
      )}
    </div>
  );
}

import { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, useGLTF } from '@react-three/drei';

export default Hero3DViewer;