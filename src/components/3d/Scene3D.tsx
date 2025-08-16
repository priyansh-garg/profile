import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
const FloatingShape = ({ position, shape = "sphere", color = "#3b82f6" }: { 
  position: [number, number, number], 
  shape?: "sphere" | "box" | "torus",
  color?: string 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  const material = (
    <meshStandardMaterial 
      color={color} 
      transparent 
      opacity={0.6}
      emissive={color}
      emissiveIntensity={0.2}
    />
  );

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {shape === "sphere" && <Sphere args={[0.5, 32, 32]}>{material}</Sphere>}
        {shape === "box" && <Box args={[0.8, 0.8, 0.8]}>{material}</Box>}
        {shape === "torus" && <Torus args={[0.6, 0.2, 16, 32]}>{material}</Torus>}
      </mesh>
    </Float>
  );
};

// Animated particles
const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create particle positions
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Wave grid
const WaveGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positionAttribute = geometry.attributes.position;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const wave = Math.sin(x * 0.5 + state.clock.elapsedTime) * 
                    Math.cos(y * 0.5 + state.clock.elapsedTime) * 0.3;
        positionAttribute.setZ(i, wave);
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color="#1e40af"
        transparent
        opacity={0.2}
        wireframe
        emissive="#3b82f6"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

export const Scene3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {/* Floating shapes */}
      <FloatingShape position={[-3, 2, 0]} shape="sphere" color="#3b82f6" />
      <FloatingShape position={[3, -1, 2]} shape="box" color="#8b5cf6" />
      <FloatingShape position={[0, 3, -2]} shape="torus" color="#06b6d4" />
      <FloatingShape position={[-2, -2, 1]} shape="sphere" color="#3b82f6" />
      <FloatingShape position={[4, 1, -1]} shape="box" color="#8b5cf6" />
      
      {/* Particles */}
      <Particles />
      
      {/* Wave grid */}
      <WaveGrid />
    </>
  );
};