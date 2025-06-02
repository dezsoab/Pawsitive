import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

// Static camera targets
const CAMERA_DEFAULT_POS = new THREE.Vector3(0, 0.9, 2);
const CAMERA_DEFAULT_LOOKAT = new THREE.Vector3(0, 0.5, 0);

const CAMERA_LOGIN_POS = new THREE.Vector3(0, 1.0, 1.0);
const CAMERA_LOGIN_LOOKAT = new THREE.Vector3(0, -0.4, 0.1);

// Initial Camera position for the first ever render-animation
const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 1.55, 3);
const DEFAULT_LOOKAT = new THREE.Vector3(0, 0.8, 1);

export default function PrinterModel({
  model,
  action,
  animationDirection,
}: {
  model: THREE.Object3D;
  action: "login" | "register" | null;
  animationDirection: "forward" | "backward";
}) {
  const ref = useRef<THREE.Object3D>(null);
  const start = useRef<number | null>(null);
  const { camera } = useThree();

  const cameraAnimationDuration = 2;

  const [fromCameraPos, setFromCameraPos] = useState(new THREE.Vector3());
  const [toCameraPos, setToCameraPos] = useState(new THREE.Vector3());
  const [fromLookAt, setFromLookAt] = useState(new THREE.Vector3());
  const [toLookAt, setToLookAt] = useState(new THREE.Vector3());

  useLayoutEffect(() => {
    camera.position.copy(DEFAULT_CAMERA_POS);
    camera.lookAt(DEFAULT_LOOKAT);
  }, [camera]);

  useEffect(() => {
    // Reset the animation start
    start.current = null;

    // Get static positions
    const currentFromPos = camera.position.clone();
    const currentFromLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentFromLookAt);
    const fromLook = camera.position.clone().add(currentFromLookAt);

    setFromCameraPos(currentFromPos);
    setFromLookAt(fromLook);

    if (action === null || animationDirection === "backward") {
      setToCameraPos(CAMERA_DEFAULT_POS);
      setToLookAt(CAMERA_DEFAULT_LOOKAT);
    } else {
      setToCameraPos(CAMERA_LOGIN_POS);
      setToLookAt(CAMERA_LOGIN_LOOKAT);
    }
  }, [camera, action, animationDirection]);

  useFrame((state) => {
    if (!ref.current) return;

    const now = state.clock.getElapsedTime();
    if (start.current === null) start.current = now;

    const t = Math.min((now - start.current) / cameraAnimationDuration, 1);
    const easedT = easeInOutSine(t);

    const newPos = fromCameraPos.clone().lerp(toCameraPos, easedT);
    const newLookAt = fromLookAt.clone().lerp(toLookAt, easedT);

    camera.position.copy(newPos);
    camera.lookAt(newLookAt);
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
