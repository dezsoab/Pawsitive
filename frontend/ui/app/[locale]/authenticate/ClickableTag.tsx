import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export default function ClickableTag({
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
