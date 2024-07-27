import logger from "@/logging/logger";
import Image from "next/image";
import React from "react";

type PersonTag = {
  imgSrc: string;
  imgAlt: string;
  name: string;
  roles: string[];
};

const PersonTag = ({ imgSrc, imgAlt, name, roles }: PersonTag) => {
  logger.info("Rendering About -> person tag with name: " + name);

  return (
    <div>
      <Image src={imgSrc} alt={imgAlt} width={170} height={200} />
      <h4>{name}</h4>
      {roles.map((role) => (
        <p key={role}>{role}</p>
      ))}
    </div>
  );
};

export default PersonTag;
