// Infinite Grid Island - Figma-style infinite canvas grid
// Renders as a fixed background that creates infinite grid illusion

import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function InfiniteGrid({ className = '' }) {
  const gridRef = useRef<THREE.GridHelper>(null);
  const cameraRef = useRef<THREE.Camera>(null);

  useEffect(() => {
    // Create a massive grid that extends infinitely via shader
    const grid = gridRef.current;
    if (!grid) return;

    // Make grid follow camera but stay at y=0
    const handleFrame = (state: any) => {
      const camera = state.camera;
      if (grid && camera) {
        // Keep grid centered on camera XZ position but at y=0
        grid.position.x = Math.round(camera.position.x / 10) * 10;
        grid.position.z = Math.round(camera.position.z / 10) * 10;
        grid.position.y = -0.01;
      }
    };

    // We'll use the frame loop from useFrame in the Canvas
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 100, 100], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.physicallyCorrectLights = true;
        }}
      >
        <color attach="background" args={['#0a0a0a']} />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a0a', 50, 300]} />

        {/* Ambient light */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight position={[100, 200, 100]} intensity={0.5} color="#ffffff" />

        {/* Infinite Grid - using custom shader for true infinite effect */}
        <InfiniteGridMesh />

        {/* Subtle ambient particles */}
        <AmbientParticles count={200} />
      </Canvas>
    </div>
  );
}

// Custom infinite grid mesh with shader
function InfiniteGridMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cameraRef = useRef<THREE.Camera>(null);

  useFrame((state) => {
    const camera = state.camera;
    const mesh = meshRef.current;
    if (mesh && camera) {
      // Follow camera XZ but stay at y=0
      mesh.position.x = Math.round(camera.position.x / 20) * 20;
      mesh.position.z = Math.round(camera.position.z / 20) * 20;
      mesh.position.y = -0.01;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10000, 10000, 1, 1]} />
      <meshBasicMaterial
        color="#1a1a1a"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
      {/* Grid lines via custom shader would go here - using pattern for now */}
    </mesh>
  );
}

// Ambient particles for atmosphere
function AmbientParticles({ count = 200 }) {
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const points = pointsRef.current;
    if (!points) return;

    const positions = points.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = Math.random() * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    points.geometry.attributes.position.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (points) {
      points.rotation.y += 0.00002;
      points.rotation.x += 0.00001;
    }
  });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = Math.random() * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#B8860B"
        size={0.5}
        transparent
        opacity={0.3}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}