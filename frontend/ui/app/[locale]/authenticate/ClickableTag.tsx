import { useMemo, useRef, useState } from "react";

import { useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ClickableTag({
  position,
  rotation = [0, 0, 0],
  onClick,
  pathToTagModel,
  randomOffset,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  onClick: () => void;
  pathToTagModel: string;
  randomOffset: number;
}) {
  const { scene } = useGLTF(pathToTagModel);
  const modelRef = useRef<THREE.Object3D>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const model = useMemo(() => {
    const clone = scene.clone();
    clone.scale.set(3.45, 3.45, 3.45);
    return clone;
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.position.y =
        position[1] + Math.sin(t * 2 + randomOffset) * 0.007;
      modelRef.current.rotation.y =
        rotation[1] + Math.sin(t * 3 + randomOffset) * 0.1;
      modelRef.current.rotation.z =
        rotation[2] + Math.sin(t * 2 + randomOffset) * 0.5;
    }
  });

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <primitive
        ref={modelRef}
        object={model}
        position={position}
        rotation={rotation}
        onPointerDown={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          onClick();
        }}
      />
    </group>
  );
}
