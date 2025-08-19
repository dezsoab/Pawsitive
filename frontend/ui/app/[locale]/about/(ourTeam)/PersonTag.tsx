"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./PersonTag.module.css";

type PersonTagProps = {
  imgSrc: string;
  imgAlt: string;
  name: string;
  roles: string[];
};

const PersonTag: React.FC<PersonTagProps> = ({
  imgSrc,
  imgAlt,
  name,
  roles,
}) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      tagRef.current,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tagRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className={styles.personTag} ref={tagRef}>
      <div className={styles.personImageWrapper}>
        <Image
          src={imgSrc}
          alt={imgAlt}
          width={300}
          height={300}
          className={styles.personImage}
        />
      </div>
      <h4>{name}</h4>
      {roles.map((role) => (
        <p key={role}>{role}</p>
      ))}
    </div>
  );
};

export default PersonTag;
