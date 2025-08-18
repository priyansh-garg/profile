import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Interactive floating geometric shapes
const FloatingShape = ({ position, shape = "sphere", color = "#3b82f6" }: { 
  position: [number, number, number], 
  shape?: "sphere" | "box" | "torus",
  color?: string 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const rotationSpeed = hovered ? 0.02 : 0.01;
      const scale = clicked ? 1.2 : hovered ? 1.1 : 1;
      
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
    }
  });

  const material = (
    <meshStandardMaterial 
      color={hovered ? "#60a5fa" : color} 
      transparent 
      opacity={hovered ? 0.8 : 0.6}
      emissive={hovered ? "#3b82f6" : color}
      emissiveIntensity={hovered ? 0.4 : 0.2}
    />
  );

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        {shape === "sphere" && <Sphere args={[0.5, 32, 32]}>{material}</Sphere>}
        {shape === "box" && <Box args={[0.8, 0.8, 0.8]}>{material}</Box>}
        {shape === "torus" && <Torus args={[0.6, 0.2, 16, 32]}>{material}</Torus>}
      </mesh>
    </Float>
  );
};

// Interactive animated particles
const Particles = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
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
      const mouseDistance = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
      const intensity = Math.max(0.002, 0.002 + mouseDistance * 0.01);
      
      meshRef.current.rotation.y += intensity + mouse.x * 0.001;
      meshRef.current.rotation.x += intensity / 2 + mouse.y * 0.001;
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

// Interactive mouse-following light
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (mouse.x * viewport.width) / 2;
      lightRef.current.position.y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.z = 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={2}
      color="#60a5fa"
      distance={10}
      decay={2}
    />
  );
};

// Interactive wave grid
const WaveGrid = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positionAttribute = geometry.attributes.position;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const mouseInfluence = Math.exp(-((x - mouse.x * 8) ** 2 + (y - mouse.y * 8) ** 2) / 15);
        const wave = Math.sin(x * 0.5 + state.clock.elapsedTime) * 
                    Math.cos(y * 0.5 + state.clock.elapsedTime) * 0.3 +
                    mouseInfluence * 1.2;
        positionAttribute.setZ(i, wave);
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 64, 64]} />
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
      {/* Interactive camera controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={10}
        minDistance={3}
        maxPolarAngle={Math.PI / 2}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
      
      {/* Dynamic lighting that follows mouse */}
      <MouseLight />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      
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