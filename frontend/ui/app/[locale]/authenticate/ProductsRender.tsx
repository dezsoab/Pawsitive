import React from "react";
import Image from "next/image";

import styles from "./Authenticate.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ProductsRenderProps = {
  images: StaticImport[];
  imageRefs: React.MutableRefObject<HTMLImageElement[]>;
  imageContainerRef: React.RefObject<HTMLDivElement>;
};

const ProductsRender = ({
  images,
  imageRefs,
  imageContainerRef,
}: ProductsRenderProps) => {
  return (
    <div className={styles.pics} ref={imageContainerRef}>
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={"product picture"}
          width={250}
          height={250}
          ref={(el) => {
            if (el) {
              imageRefs.current[index] = el;
            }
          }}
        />
      ))}
    </div>
  );
};

export default ProductsRender;
