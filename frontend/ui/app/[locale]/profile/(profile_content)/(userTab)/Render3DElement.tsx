"use client";
import React, { Suspense, useMemo, useRef } from "react";
import styles from "./UserTab.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function RotatingTag({ model }: { model: THREE.Object3D }) {
  const ref = useRef<THREE.Object3D>(null);
  const animationStartTime = useRef<number | null>(null);

  const delay = 0.8;
  const duration = 1.2;
  const fullRotation = Math.PI * 4;

  const initialRotationX = THREE.MathUtils.degToRad(77);
  const initialRotationZ = THREE.MathUtils.degToRad(30);

  useFrame((state) => {
    const currentTime = state.clock.getElapsedTime();

    if (animationStartTime.current === null) {
      animationStartTime.current = currentTime;
    }

    const timeSinceMount = currentTime - animationStartTime.current;

    if (!ref.current) return;

    ref.current.rotation.x = initialRotationX;

    if (timeSinceMount < delay) {
      ref.current.rotation.z = initialRotationZ;
      return;
    }

    const t = Math.min((timeSinceMount - delay) / duration, 1);
    const easedT = easeInOutSine(t);
    ref.current.rotation.z = initialRotationZ + fullRotation * easedT;
  });

  return <primitive ref={ref} object={model} position={[0, 0, 0]} />;
}

export default function Render3DElement() {
  const { scene } = useGLTF("/assets/CoffeCat.glb");

  const clonedTag = useMemo(() => {
    const model = scene.clone();
    model.scale.set(0.8, 0.8, 0.8);
    return model;
  }, [scene]);

  return (
    <div className={styles.render}>
      <Canvas
        style={{ height: 350, background: "var(--color-pink-light)" }}
        camera={{ position: [0, 0, 3], fov: 1 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 20]} intensity={3.3} />
        <spotLight
          position={[5, 2, 1]}
          angle={2}
          penumbra={0.9}
          intensity={5}
        />
        <Suspense fallback={null}>
          <RotatingTag model={clonedTag} />
        </Suspense>
        <OrbitControls
          minDistance={1.5}
          maxDistance={4}
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/CoffeCat.glb");
