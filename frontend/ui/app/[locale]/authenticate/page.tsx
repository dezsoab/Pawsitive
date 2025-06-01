"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";
import Navbar from "@/components/navigation/Navbar";

import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { SoftShadows, Environment } from "@react-three/drei";
import PrinterModel from "./PrinterModel";
import ClickableTag from "./ClickableTag";
import LoginForm from "./LoginForm";

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
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    if (action !== null) {
      const timeout = setTimeout(() => {
        setFormVisible(true);
      }, 2000); // Match animation duration
      return () => clearTimeout(timeout);
    } else {
      setFormVisible(false);
    }
  }, [action]);

  return (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div
        style={{
          height: "100vh",
          background: "var(--color-pink-light)",
          position: "relative",
        }}
      >
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
          <SoftShadows />
          <Environment files="/assets/studioLighting.hdr" background={false} />
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
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
          />
        </Canvas>
        {action === "login" && formVisible && <LoginForm />}
        {action === "register" && formVisible && <RegisterForm />}
      </div>
    </>
  );
}

useGLTF.preload("/assets/printer.glb");
useGLTF.preload("/assets/testTag.glb");
