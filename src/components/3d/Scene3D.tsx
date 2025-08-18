import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Interactive particle field that responds to mouse
const InteractiveParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  const particleCount = 2000;
  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return [positions, velocities];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Calculate distance to mouse
        const dx = positions[i3] - mouseX;
        const dy = positions[i3 + 1] - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Mouse attraction/repulsion
        if (distance < 3) {
          const force = (3 - distance) * 0.001;
          velocities[i3] += dx * force;
          velocities[i3 + 1] += dy * force;
        }
        
        // Apply velocities
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Damping
        velocities[i3] *= 0.99;
        velocities[i3 + 1] *= 0.99;
        velocities[i3 + 2] *= 0.99;
        
        // Boundary wrapping
        if (positions[i3] > 10) positions[i3] = -10;
        if (positions[i3] < -10) positions[i3] = 10;
        if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
        if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
        if (positions[i3 + 2] > 5) positions[i3 + 2] = -5;
        if (positions[i3 + 2] < -5) positions[i3 + 2] = 5;
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

// Connection lines between nearby particles
const ParticleConnections = () => {
  const ref = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (ref.current && particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const linePositions: number[] = [];
      const maxDistance = 1.5;
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;

      for (let i = 0; i < positions.length; i += 3) {
        for (let j = i + 3; j < positions.length; j += 3) {
          const dx = positions[i] - positions[j];
          const dy = positions[i + 1] - positions[j + 1];
          const dz = positions[i + 2] - positions[j + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            // Check if either particle is near mouse
            const dist1 = Math.sqrt((positions[i] - mouseX) ** 2 + (positions[i + 1] - mouseY) ** 2);
            const dist2 = Math.sqrt((positions[j] - mouseX) ** 2 + (positions[j + 1] - mouseY) ** 2);
            
            if (dist1 < 2 || dist2 < 2) {
              linePositions.push(positions[i], positions[i + 1], positions[i + 2]);
              linePositions.push(positions[j], positions[j + 1], positions[j + 2]);
            }
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      ref.current.geometry = lineGeometry;
    }
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
    </lineSegments>
  );
};

// Morphing sphere that reacts to mouse
const MorphingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.SphereGeometry;
      const positionAttribute = geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        
        const mouseInfluence = Math.exp(-(mouse.x ** 2 + mouse.y ** 2) * 2);
        const time = state.clock.elapsedTime;
        
        vertex.normalize();
        const distortion = Math.sin(vertex.x * 4 + time) * Math.cos(vertex.y * 4 + time) * 0.1;
        const mouseDistortion = mouseInfluence * 0.3;
        
        vertex.multiplyScalar(1 + distortion + mouseDistortion);
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
      
      // Rotate based on mouse position
      meshRef.current.rotation.y += mouse.x * 0.01;
      meshRef.current.rotation.x += mouse.y * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.3}
        wireframe
        emissive="#3b82f6"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Mouse follower light with color change
const MouseFollowerLight = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = (mouse.x * viewport.width) / 2;
      lightRef.current.position.y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.z = 2;
      
      // Change color based on mouse position
      const hue = (mouse.x + 1) * 0.5 * 360;
      lightRef.current.color.setHSL(hue / 360, 0.7, 0.6);
      
      // Pulsing intensity
      lightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={1.5}
      distance={8}
      decay={2}
    />
  );
};

export const Scene3D = () => {
  return (
    <>
      {/* Dynamic lighting */}
      <ambientLight intensity={0.2} />
      <MouseFollowerLight />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[-5, -5, 5]} intensity={0.3} color="#8b5cf6" />
      
      {/* Interactive elements */}
      <InteractiveParticles />
      <ParticleConnections />
      <MorphingSphere />
      
      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 8, 15]} />
    </>
  );
};