import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import ErrorBoundary from "../ErrorBoundary";

/* ── Dark glossy central orb (profile backing) ─────────────────── */
function CentralOrb({ position }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.15;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={1.55}>
        <icosahedronGeometry args={[1, 32]} />
        <MeshDistortMaterial
          color="#0d1a2a"
          distort={0.18}
          speed={1.2}
          roughness={0.08}
          metalness={0.92}
          emissive="#80db66"
          emissiveIntensity={0.04}
        />
      </mesh>
    </Float>
  );
}

/* ── Orbit ring around profile area ────────────────────────────── */
function OrbitRing({ radius, speed, color, opacity = 0.35, tilt = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
  });

  return (
    <group ref={ref} rotation={tilt} scale={scale}>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={1} />
      </line>
    </group>
  );
}

/* ── Wireframe sphere (depth accent) ──────────────────────────── */
function WireSphere({ position, scale = 0.45, speed = 0.6, color = "#4d77ff" }) {
  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

/* ── Floating diamond (low-poly) ──────────────────────────────── */
function Diamond({ position, color = "#80db66", scale = 0.35, speed = 1.5 }) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          flatShading
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

/* ── Torus (ring accent) ──────────────────────────────────────── */
function FloatingTorus({ position, color = "#22c55e", scale = 0.4, speed = 1.1 }) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh position={position} scale={scale}>
        <torusGeometry args={[1, 0.28, 24, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

/* ── Small floating cube ──────────────────────────────────────── */
function FloatingCube({ position, color = "#4d77ff", scale = 0.2, speed = 1.8 }) {
  return (
    <Float speed={speed} rotationIntensity={2.5} floatIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
    </Float>
  );
}

/* ── Glowing orb (small accent) ───────────────────────────────── */
function GlowOrb({ position, color = "#80db66", scale = 0.12, speed = 2 }) {
  return (
    <Float speed={speed} rotationIntensity={0} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ── Wireframe torus knot (blue accent) ───────────────────────── */
function WireKnot({ position, color = "#4d77ff", scale = 0.5 }) {
  return (
    <Float speed={1.4} rotationIntensity={1.6} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.22, 128, 16]} />
        <meshStandardMaterial
          color={color}
          wireframe
          emissive={color}
          emissiveIntensity={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

/* ── Tech label floating hologram ─────────────────────────────── */
function TechNode({ position, color = "#80db66" }) {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh position={position}>
        <planeGeometry args={[0.9, 0.28]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
    </Float>
  );
}

/* ── Multi-layer parallax pointer group ──────────────────────── */
function ParallaxScene({ children }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      state.pointer.x * 0.2 + Math.sin(t * 0.1) * 0.04,
      0.04
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -state.pointer.y * 0.12,
      0.04
    );
  });
  return <group ref={ref}>{children}</group>;
}

function DeepParallax({ children }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      state.pointer.x * 0.08 + Math.sin(t * 0.06) * 0.02,
      0.025
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -state.pointer.y * 0.05,
      0.025
    );
  });
  return <group ref={ref}>{children}</group>;
}

/* ── Main scene ───────────────────────────────────────────────── */
export default function HeroScene({ reducedMotion = false }) {
  if (reducedMotion) return null;

  return (
    <div className="scene-canvas" aria-hidden="true">
      <ErrorBoundary>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 4, 4]} intensity={50} color="#4d77ff" distance={20} decay={2} />
          <pointLight position={[-5, -3, 3]} intensity={40} color="#80db66" distance={18} decay={2} />
          <pointLight position={[0, 0, 5]} intensity={15} color="#ffffff" distance={12} decay={2} />

          {/* Midground parallax layer */}
          <ParallaxScene>
            <CentralOrb position={[1.2, 0.1, -0.5]} />

            {/* Orbit rings around profile area */}
            <group position={[1.2, 0.1, 0]}>
              <OrbitRing radius={2.2} speed={0.12} color="#80db66" opacity={0.25} tilt={[0.4, 0.2, 0.1]} />
              <OrbitRing radius={2.6} speed={-0.08} color="#4d77ff" opacity={0.15} tilt={[0.6, -0.3, -0.2]} />
            </group>

            {/* Floating objects - intentionally positioned */}
            <WireKnot position={[3.2, 1.0, -2.5]} color="#4d77ff" scale={0.45} />
            <Diamond position={[-3.4, -1.0, -1.2]} color="#80db66" scale={0.3} speed={1.3} />
            <FloatingTorus position={[-2.6, 1.5, -2.8]} color="#22c55e" scale={0.35} speed={0.9} />
            <FloatingCube position={[2.8, -1.5, -1.8]} color="#4d77ff" scale={0.18} speed={2} />
            <FloatingCube position={[-1.8, -2.0, -3.2]} color="#80db66" scale={0.14} speed={2.2} />
            <GlowOrb position={[3.5, -0.3, -0.8]} color="#4d77ff" scale={0.1} speed={1.8} />
            <GlowOrb position={[-3.8, 0.5, -1.5]} color="#80db66" scale={0.08} speed={2.2} />

            {/* Sparkles (foreground particles) */}
            <Sparkles count={50} scale={[10, 6, 3]} size={1.8} speed={0.3} color="#80db66" opacity={0.5} />
          </ParallaxScene>

          {/* Deep background layer */}
          <DeepParallax>
            <WireSphere position={[-4.5, 2.2, -6]} scale={0.6} speed={0.4} color="#4d77ff" />
            <WireSphere position={[4.8, -2.5, -7]} scale={0.4} speed={0.3} color="#80db66" />
            <TechNode position={[3.8, 2.8, -5]} color="#80db66" />
            <TechNode position={[-4.2, -2.2, -5.5]} color="#4d77ff" />
            <TechNode position={[1.5, 3.2, -6.5]} color="#80db66" />
          </DeepParallax>

          {/* Background stars (static, deepest layer) */}
          <Stars radius={40} depth={35} count={2500} factor={3} saturation={0.3} fade speed={0.4} />
        </Suspense>
      </Canvas>
      </ErrorBoundary>
    </div>
  );
}
