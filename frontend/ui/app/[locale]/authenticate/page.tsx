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
import BackButton from "./BackButton";
import { useWindowSize } from "./getWindowSize";
import Cat from "@/components/loader/Cat";
import RegisterForm from "./RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { navigationRoutes } from "@/enums/navigationRoutes";
import { queryParams } from "@/enums/queryParams";

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

export default function AuthenticatePage() {
  const searchParams = useSearchParams();
  const isFreshTag = Boolean(searchParams.get(queryParams.ISFRESHTAG));
  const tagId = searchParams.get(queryParams.TAGID);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(
        `${navigationRoutes.PROFILE}?${queryParams.TAGID}=${tagId}&${queryParams.ISFRESHTAG}=${isFreshTag}`
      );
    }
  }, [isLoggedIn, router]);

  const { scene } = useGLTF("/assets/printer.glb");
  const clonedModel = useMemo(() => {
    const clone = scene.clone();
    clone.scale.set(1.5, 1.5, 1.5);
    clone.rotation.x = Math.PI / 2;

    return clone;
  }, [scene]);

  const [action, setAction] = useState<"login" | "register" | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [showTags, setShowTags] = useState(true);
  const { width } = useWindowSize();

  const loginTagOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const registerTagOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  const handleBackWardsAnimation = () => {
    setAnimationDirection("backward");
    setFormVisible(false);

    const timeout = setTimeout(() => {
      setShowTags(true);
    }, 2000); // Match animation duration
    return () => clearTimeout(timeout);
  };

  const handleLoginAnimation = () => {
    setAnimationDirection("forward");
    setAction("login");
    setShowTags(false);
    setTimeout(() => {
      setFormVisible(true);
    }, 1000);
  };

  const handleRegisterAnimation = () => {
    setAnimationDirection("forward");
    setAction("register");
    setShowTags(false);
    const timeout = setTimeout(() => {
      setFormVisible(true);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  return isLoggedIn ? (
    <Cat />
  ) : (
    <>
      <Navbar style={{ backgroundColor: "var(--color-green)" }} />
      <div
        style={{
          height: "100vh",
          background: "var(--color-pink-light)",
          position: "relative",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: width < 1030 ? 50 : 35 }}
        >
          <SoftShadows />
          <Environment
            files="/assets/brown_photostudio_02_1k.hdr"
            background={false}
          />
          <Suspense fallback={<Cat />}>
            <PrinterModel
              model={clonedModel}
              action={action}
              animationDirection={animationDirection}
            />

            {showTags && (
              <>
                <ClickableTag
                  randomOffset={loginTagOffset}
                  position={[-0.1, 0.45, 0.75]}
                  rotation={[Math.PI / 2 - 0.4, Math.PI / 2 - 1.4, -0.6]}
                  onClick={handleLoginAnimation}
                  pathToTagModel="/assets/testTag.glb"
                />
                <ClickableTag
                  randomOffset={registerTagOffset}
                  position={[0.08, 0.45, 0.75]}
                  rotation={[Math.PI / 2 - 0.4, -Math.PI / 2 + 1.4, 0.65]}
                  onClick={handleRegisterAnimation}
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
          {action != null && formVisible && (
            <Html
              position={width < 1030 ? [0.2, -0.28, 0.5] : [0.8, -1, 0.2]} // mobile vs desktop
              center
              zIndexRange={[3, 4]}
            >
              <BackButton onClick={handleBackWardsAnimation} />
            </Html>
          )}
        </Canvas>
        {action === "login" && formVisible && <LoginForm />}
        {action === "register" && formVisible && <RegisterForm />}
      </div>
    </>
  );
}

useGLTF.preload("/assets/printer.glb");
useGLTF.preload("/assets/testTag.glb");
