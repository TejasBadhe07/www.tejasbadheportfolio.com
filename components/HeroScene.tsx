"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

type Palette = { core: string; glow: string; accent: string; wire: string; points: string };

const palettes: Record<"dark" | "light", Palette> = {
  dark: { core: "#7c3aed", glow: "#22d3ee", accent: "#f472b6", wire: "#a78bfa", points: "#c4b5fd" },
  light: { core: "#7c3aed", glow: "#0891b2", accent: "#db2777", wire: "#6d28d9", points: "#6d28d9" },
};

// A shell of softly glowing points around the core
function Particles({ color, count = 1400 }: { color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    // Deterministic pseudo-random spread so every render matches
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + rand() * 3.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.025} sizeAttenuation transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Ring({ radius, color, speed, tilt }: { radius: number; color: string; speed: number; tilt: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.006, 16, 220]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

function Satellite({ radius, speed, color, offset, size = 0.07 }: { radius: number; speed: number; color: string; offset: number; size?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * 0.45, Math.sin(t) * radius);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
    </mesh>
  );
}

function Orb({ palette }: { palette: Palette }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  // Desktop: sit to the right of the text. Phone: sit above it, a bit smaller.
  const isNarrow = viewport.width < 7;
  const scale = isNarrow ? 0.62 : 1;
  const x = isNarrow ? 0 : Math.min(viewport.width * 0.22, 3.2);
  const y = isNarrow ? 1.9 : 0;

  useFrame((_, delta) => {
    if (!group.current) return;
    // Lean gently toward the pointer
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.5, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.35, 3, delta);
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <group position={[x, y, 0]} scale={scale}>
      <group ref={group}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh>
            <icosahedronGeometry args={[1.35, 32]} />
            <MeshDistortMaterial color={palette.core} roughness={0.12} metalness={0.55} distort={0.38} speed={1.6} emissive={palette.core} emissiveIntensity={0.25} />
          </mesh>
          <mesh ref={shell}>
            <icosahedronGeometry args={[2.05, 1]} />
            <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.16} />
          </mesh>
        </Float>
        <Ring radius={2.6} color={palette.glow} speed={0.25} tilt={[Math.PI / 2.3, 0.2, 0]} />
        <Ring radius={3.05} color={palette.accent} speed={-0.18} tilt={[Math.PI / 1.8, -0.35, 0.4]} />
        <Satellite radius={2.6} speed={0.6} color={palette.glow} offset={0} />
        <Satellite radius={3.05} speed={-0.45} color={palette.accent} offset={2} size={0.055} />
        <Satellite radius={2.3} speed={0.8} color="#ffffff" offset={4} size={0.04} />
      </group>
      <Particles color={palette.points} />
    </group>
  );
}

export default function HeroScene({ theme, paused }: { theme: "dark" | "light"; paused: boolean }) {
  const palette = palettes[theme];
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={paused ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={theme === "dark" ? 0.35 : 0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 2]} intensity={25} color={palette.glow} />
      <pointLight position={[4, 3, -2]} intensity={20} color={palette.accent} />
      <Orb palette={palette} />
      <Sparkles count={40} scale={[12, 6, 4]} size={2} speed={0.3} opacity={0.5} color={palette.glow} />
    </Canvas>
  );
}
