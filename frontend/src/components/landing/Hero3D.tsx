import React, { Component, useRef } from "react";
import type { ErrorInfo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, Html } from "@react-three/drei";
import * as THREE from "three";

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    console.error("Three.js Error Boundary Caught:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="flex items-center justify-center h-full w-full text-red-500 font-bold p-4 text-center">Something went wrong rendering 3D. Please refresh.</div>;
    }

    return this.props.children;
  }
}

function PlayfulEmoji({
  symbol,
  position,
  delay,
}: {
  symbol: string;
  position: [number, number, number];
  delay: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 2 + delay) * 0.2;
    ref.current.rotation.z = Math.sin(t * 1.5 + delay) * 0.2;
  });

  return (
    <group ref={ref} position={position}>
      <Html transform center className="pointer-events-none select-none">
        <div className="text-6xl filter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
          {symbol}
        </div>
      </Html>
    </group>
  );
}

function VibrantInvitationCard() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const x = (state.pointer.x * Math.PI) / 10;
    const y = (state.pointer.y * Math.PI) / 10;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x, 0.1);
    group.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group ref={group}>
      {/* Floating Emojis Around the Card */}
      <PlayfulEmoji symbol="💖" position={[-2, 1.5, -1]} delay={0} />
      <PlayfulEmoji symbol="🥂" position={[2, 1, -1.5]} delay={1} />
      <PlayfulEmoji symbol="💍" position={[-1.5, -1.5, -0.5]} delay={2} />
      <PlayfulEmoji symbol="🕊️" position={[1.8, -1.2, -1]} delay={3} />
      <PlayfulEmoji symbol="✨" position={[0, 2.2, -2]} delay={4} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Base Glass Card */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 4.5, 0.05]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent={true}
            opacity={0.8}
            metalness={0.1}
            roughness={0.1}
          />
        </mesh>

        {/* Gradient Backing */}
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[3.1, 4.4]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>

        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[2.9, 4.2]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.2}
            wireframe={true}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Typography */}
        <Html position={[0, 0, 0.04]} transform center pointerEvents="none" zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center justify-center space-y-6 w-80 text-center select-none pointer-events-none">
            <h2 className="text-[#ec4899] font-black tracking-widest text-sm uppercase">
              JOIN THE PARTY
            </h2>
            <h1 className="text-[#6366f1] font-black text-6xl">
              A & R
            </h1>
            <p className="text-[#1e293b] font-bold text-xs max-w-[200px]">
              The most aesthetic wedding of the year.
            </p>
          </div>
        </Html>

        {/* A colorful 3D "Sticker" */}
        <mesh position={[1, 1.5, 0.05]} rotation={[0, 0, -0.2]}>
          <circleGeometry args={[0.4, 32]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.3} metalness={0.2} />
        </mesh>
        <Html position={[1, 1.5, 0.06]} transform center pointerEvents="none" zIndexRange={[100, 0]}>
          <div className="text-[#b45309] font-black text-sm rotate-[-12deg] select-none">
            RSVP
          </div>
        </Html>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="h-full w-full z-10 relative">
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: false, alpha: true }}
          onCreated={({ gl }) => console.log("Canvas created successfully", gl)}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#ec4899" />
          <pointLight position={[-5, 5, -5]} intensity={2} color="#06b6d4" />
          <pointLight position={[5, -5, 5]} intensity={2} color="#8b5cf6" />
          
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-0.1, 0.1]}
            azimuth={[-0.2, 0.2]}
          >
            <VibrantInvitationCard />
          </PresentationControls>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
