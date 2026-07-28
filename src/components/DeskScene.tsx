"use client";
import React, { useRef, useState, useMemo } from "react";
import { Environment, ContactShadows, PresentationControls, Float, Text, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneType } from "./SignatureScene";

interface DeskSceneProps {
  activeScene: SceneType;
  onInteract: (scene: SceneType, sfx: string) => void;
  isLampOn: boolean;
  setIsLampOn: (val: boolean) => void;
  locale: string;
}

export default function DeskScene({ activeScene, onInteract, isLampOn, setIsLampOn, locale }: DeskSceneProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Dynamic Camera Targets - recalibrated for the local blueprint composition
  const targets = useMemo(() => ({
    projects: { pos: new THREE.Vector3(0, 1.8, 3.5), look: new THREE.Vector3(0, 1.5, 0) },
    about: { pos: new THREE.Vector3(-1.8, 1.5, 3.5), look: new THREE.Vector3(-1.5, 0.8, 1) },
    contact: { pos: new THREE.Vector3(1.8, 1.5, 3.5), look: new THREE.Vector3(1.5, 0.8, 1) },
    education: { pos: new THREE.Vector3(0, 1, 4), look: new THREE.Vector3(0, 0, 0) },
    skills: { pos: new THREE.Vector3(0, 2, 5), look: new THREE.Vector3(0, 1, 0) },
    none: { pos: new THREE.Vector3(0, 2.5, 8), look: new THREE.Vector3(0, 0.5, 0) }
  }), []);

  useFrame((state) => {
    if (!state.camera) return;
    const target = targets[activeScene as keyof typeof targets] || targets.none;

    // Smooth cinematic camera lerping
    state.camera.position.lerp(target.pos, 0.05);
    state.camera.lookAt(target.look);
  });

  return (
    <>
      <PresentationControls
        global
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 3, tension: 800 }}
        rotation={[0, 0, 0]}
        polar={[-0.1, 0.1]}
        azimuth={[-0.1, 0.1]}
      >
        <group position-y={-1}>

          {/* 1. THE DESK (Minimalist Glass & Metal) */}
          <group position={[0, 0, 0]}>
            {/* Glass Top */}
            <mesh position={[0, 0.7, 0]} receiveShadow>
              <boxGeometry args={[6, 0.05, 3]} />
              <meshPhysicalMaterial
                color="#0a101f"
                transmission={0.9}
                thickness={0.5}
                roughness={0.1}
                metalness={0.8}
                emissive="#c9a84c"
                emissiveIntensity={0.05}
              />
            </mesh>
            {/* Metal Frame */}
            <mesh position={[-2.9, 0.35, 0]}>
                <boxGeometry args={[0.1, 0.7, 3]} />
                <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[2.9, 0.35, 0]}>
                <boxGeometry args={[0.1, 0.7, 3]} />
                <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
            </mesh>
          </group>

          {/* 2. THE MAIN MONITOR (Project Hub) */}
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <group
                position={[0, 1.6, -0.5]}
                onClick={() => onInteract("projects", "click")}
                onPointerOver={() => setHovered("monitor")}
                onPointerOut={() => setHovered(null)}
            >
                {/* Screen Housing */}
                <mesh castShadow>
                    <boxGeometry args={[2.8, 1.6, 0.1]} />
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.3} />
                </mesh>
                {/* Glowing Screen Content */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[2.6, 1.4]} />
                    <meshStandardMaterial
                        emissive="#c9a84c"
                        emissiveIntensity={isLampOn ? 0.4 : 0.1}
                        color="#050505"
                    />
                </mesh>
                {/* Stand */}
                <mesh position={[0, -1, 0]}>
                    <boxGeometry args={[0.4, 0.8, 0.1]} />
                    <meshStandardMaterial color="#333" metalness={1} />
                </mesh>
                <mesh position={[0, -1.4, 0]}>
                    <boxGeometry args={[1, 0.05, 0.6]} />
                    <meshStandardMaterial color="#333" metalness={1} />
                </mesh>
            </group>
          </Float>

          {/* 3. THE LAPTOP (Education / CV) */}
          <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <group
                position={[-1.8, 0.8, 0.8]}
                rotation={[0, 0.4, 0]}
                onClick={() => onInteract("about", "laptop")}
                onPointerOver={() => setHovered("laptop")}
                onPointerOut={() => setHovered(null)}
            >
                {/* Lower body */}
                <mesh castShadow>
                    <boxGeometry args={[1.2, 0.05, 0.8]} />
                    <meshStandardMaterial color="#444" metalness={1} roughness={0.3} />
                </mesh>
                {/* Screen (Opened) */}
                <mesh position={[0, 0.35, -0.4]} rotation={[-0.4, 0, 0]}>
                    <boxGeometry args={[1.2, 0.8, 0.03]} />
                    <meshStandardMaterial color="#444" metalness={1} />
                </mesh>
                {/* Glowing Screen */}
                <mesh position={[0, 0.35, -0.38]} rotation={[-0.4, 0, 0]}>
                    <planeGeometry args={[1.1, 0.7]} />
                    <meshStandardMaterial emissive="#fff" emissiveIntensity={0.2} color="#111" />
                </mesh>
            </group>
          </Float>

          {/* 4. THE MUG (Contact) */}
          <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
            <group
                position={[1.8, 0.85, 0.8]}
                onClick={() => onInteract("contact", "clink")}
                onPointerOver={() => setHovered("mug")}
                onPointerOut={() => setHovered(null)}
            >
                <mesh castShadow>
                    <cylinderGeometry args={[0.15, 0.15, 0.35, 32]} />
                    <meshPhysicalMaterial
                        color="#fafaf5"
                        roughness={0}
                        metalness={0}
                        clearcoat={1}
                    />
                </mesh>
                {/* Handle */}
                <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                    <torusGeometry args={[0.08, 0.02, 16, 32, Math.PI]} />
                    <meshStandardMaterial color="#fafaf5" />
                </mesh>
            </group>
          </Float>

          {/* 5. THE LAMP (Light Toggle) */}
          <group position={[-2.2, 0.75, -0.8]}>
            {/* Base */}
            <mesh
                castShadow
                onClick={() => setIsLampOn(!isLampOn)}
                onPointerOver={() => setHovered("lamp")}
                onPointerOut={() => setHovered(null)}
            >
                <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
                <meshStandardMaterial color="#111" metalness={1} />
            </mesh>
            {/* Arm */}
            <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 1.2]} />
                <meshStandardMaterial color="#222" metalness={1} />
            </mesh>
            {/* Head */}
            <mesh position={[0.4, 1.2, 0]} rotation={[0, 0, -Math.PI/4]}>
                <cylinderGeometry args={[0.2, 0.1, 0.3, 32]} />
                <meshStandardMaterial color="#111" metalness={1} />
            </mesh>
            {/* Glow Light */}
            {isLampOn && (
              <mesh position={[0.6, 1, 0]}>
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial color="#ffda91" />
              </mesh>
            )}
          </group>

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.6}
            scale={10}
            blur={2.5}
            far={1.5}
          />
        </group>
      </PresentationControls>

      {/* Dynamic Lighting */}
      <ambientLight intensity={isLampOn ? 0.6 : 0.05} />
      <spotLight
        position={[5, 10, 5]}
        angle={0.15}
        penumbra={1}
        intensity={isLampOn ? 1.5 : 0.1}
        castShadow
      />

      {isLampOn && (
        <pointLight
          position={[-1.5, 2, 0]}
          intensity={3}
          color="#ffd59e"
          distance={8}
          decay={2}
        />
      )}

      <Environment preset="night" />
    </>
  );
}
