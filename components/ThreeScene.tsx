"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={4}
          distort={0.4}
          radius={1}
          emissive="#a855f7"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 50 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={2} />
        <Crystal />
        <Particles />
      </Canvas>
    </div>
  );
}
