"use client";

import {
  Environment,
  OrbitControls,
  SoftShadows,
  useGLTF,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useMemo, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import * as THREE from "three";

import Cat from "@/components/loader/Cat";
import styles from "./TagSection.module.css";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const RotatingTag = ({
  model,
  triggerRef,
}: {
  model: THREE.Object3D;
  triggerRef: React.RefObject<HTMLDivElement>;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [rotationDone, setRotationDone] = useState(false);

  useEffect(() => {
    if (!groupRef.current || !triggerRef.current || rotationDone) return;

    const ctx = gsap.context(() => {
      gsap.to(groupRef.current!.rotation, {
        y: Math.PI * 2,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 50%",
          once: true,
        },
        onComplete: () => {
          groupRef.current!.rotation.z = 0;
          setRotationDone(true);
        },
      });
    });

    return () => ctx.revert();
  }, [rotationDone, triggerRef]);

  return (
    <group ref={groupRef}>
      <primitive object={model} dispose={null} />
    </group>
  );
};

const ForceResize = () => {
  const { size, gl } = useThree();

  useEffect(() => {
    gl.setSize(size.width, size.height);
    gl.setPixelRatio(window.devicePixelRatio);
  }, [size, gl]);

  return null;
};

const TagSection = () => {
  const t = useTranslations();
  const { scene } = useGLTF("/assets/Bone_tag.glb");
  const triggerRef = useRef<HTMLDivElement>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    const scale = 12;
    clone.scale.set(scale, scale, scale);
    clone.rotation.x = 1.2;
    clone.position.y = 0.01;
    return clone;
  }, [scene]);

  useEffect(() => {
    const resizeCanvas = () => {
      const wrapper = triggerRef.current;
      const canvas = wrapper?.querySelector("canvas");

      if (!wrapper || !canvas) return;

      const { width, height } = wrapper.getBoundingClientRect();

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;

      const gl = (canvas as any).__r3f?.root?.gl;
      const camera = (canvas as any).__r3f?.root?.camera;

      if (gl && camera) {
        gl.setSize(width, height, false);
        gl.setPixelRatio(window.devicePixelRatio);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className={styles.printerSection}>
      <div className={styles.canvasWrapper} ref={triggerRef}>
        <Canvas
          camera={{ position: [-0.5, 0.5, 0.8], fov: 50 }}
          dpr={[1, 2]}
          style={{ height: "100%", width: "100%" }}
          resize={{ scroll: true, debounce: { scroll: 0, resize: 0 } }}
        >
          <ForceResize />
          <Environment preset="warehouse" background={false} />
          <Suspense fallback={<Cat />}>
            <RotatingTag model={clonedScene} triggerRef={triggerRef} />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.5} // how close you can zoom
            maxDistance={1} // how far you can zoom
          />
        </Canvas>
      </div>
      <div className={styles.printerText}>
        <h1>
          {t("Index.printerSection.title1")}
          <br />
          {t("Index.printerSection.title2")}
          <br />
          {t("Index.printerSection.title3")}
        </h1>
        <p>{t("Index.printerSection.description1")}</p>
        <br />
        <br />
        <p>{t("Index.printerSection.description2")}</p>
      </div>
    </div>
  );
};

export default TagSection;

useGLTF.preload("/assets/Bone_tag.glb");
