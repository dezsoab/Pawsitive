"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import Navbar from "@/components/navigation/Navbar";

import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { SoftShadows, Environment } from "@react-three/drei";

function DebugLight({
  position,
  color = "white",
  intensity = 1.0,
}: {
  position: [number, number, number];
  color?: string;
  intensity?: number;
}) {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, DirectionalLightHelper, 0.5, color);

  return (
    <directionalLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      castShadow
    />
  );
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function PrinterModel({
  model,
  action,
}: {
  model: THREE.Object3D;
  action: "login" | "register" | null;
}) {
  const ref = useRef<THREE.Object3D>(null);
  const start = useRef<number | null>(null);
  const cameraAnimationDuration = 2;

  useEffect(() => {
    start.current = null;
  }, [action]);

  useFrame((state) => {
    if (!ref.current) return;

    const now = state.clock.getElapsedTime();
    if (start.current === null) start.current = now;
    const t = Math.min((now - start.current) / cameraAnimationDuration, 1);
    const easedT = easeInOutSine(t);

    if (action === null) {
      // Initial animation
      state.camera.position.set(0, 1.5 - 0.8 * easedT, 3 - 1 * easedT);
      state.camera.lookAt(0, 0.5, 0);
    } else {
      state.camera.position.set(0, 1.0 + 0.01 * easedT, 2.0 - 1.0 * easedT);
      state.camera.lookAt(0, 0.5 - 0.9 * easedT, 0.1);
    }
  });

  return (
    <primitive
      castShadow
      receiveShadow
      ref={ref}
      object={model}
      position={[0, 0.56, 0.5]}
    />
  );
}

function ClickableTag({
  position,
  rotation,
  onClick,
  pathToTagModel,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  onClick: () => void;
  pathToTagModel: string;
}) {
  const { scene } = useGLTF(pathToTagModel);
  const model = useMemo(() => {
    const clone = scene.clone();
    clone.scale.set(2.5, 2.5, 2.5);
    return clone;
  }, [scene]);

  return (
    <primitive
      object={model}
      position={position}
      rotation={rotation}
      onPointerDown={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
}

function LoginForm() {
  return (
    <Html position={[0, 0.4, 0]} center>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          background: "white",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <input placeholder="Email" type="email" required />
        <input placeholder="Password" type="password" required />
        <button type="submit">Login</button>
      </form>
    </Html>
  );
}

function RegisterForm() {
  return (
    <Html position={[0, 0.4, 0]} center>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          background: "white",
          padding: "1rem",
          borderRadius: "1rem",
        }}
      >
        <input placeholder="Name" required />
        <input placeholder="Email" type="email" required />
        <input placeholder="Password" type="password" required />
        <button type="submit">Register</button>
      </form>
    </Html>
  );
}

export default function AuthenticatePage() {
  const { scene } = useGLTF("/assets/printer.glb");
  const clonedModel = useMemo(() => {
    const clone = scene.clone();
    clone.scale.set(1.5, 1.5, 1.5);
    clone.rotation.x = Math.PI / 2;

    return clone;
  }, [scene]);

  const [action, setAction] = useState<"login" | "register" | null>(null);

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div style={{ height: "100vh", background: "var(--color-pink-light)" }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
          <SoftShadows />
          <Environment files="/assets/studioLighting.hdr" background={false} />
          {/* <axesHelper args={[5]} />
          <gridHelper args={[10, 10]} /> */}
          <Suspense fallback={null}>
            <PrinterModel model={clonedModel} action={action} />
            {action === null && (
              <>
                <ClickableTag
                  position={[-0.1, 0.45, 0.75]}
                  rotation={[Math.PI / 2 - 0.4, Math.PI / 2 - 1.4, -0.6]}
                  onClick={() => setAction("login")}
                  pathToTagModel="/assets/testTag.glb"
                />
                <ClickableTag
                  position={[0.08, 0.45, 0.75]}
                  rotation={[Math.PI / 2 - 0.4, -Math.PI / 2 + 1.4, 0.65]}
                  onClick={() => setAction("register")}
                  pathToTagModel="/assets/testTag.glb"
                />
              </>
            )}
            {action === "login" && <LoginForm />}
            {action === "register" && <RegisterForm />}
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
          />
        </Canvas>
      </div>
    </>
  );
}

useGLTF.preload("/assets/printer.glb");
useGLTF.preload("/assets/testTag.glb");
