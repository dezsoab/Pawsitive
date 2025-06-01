import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export default function PrinterModel({
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
