import React from "react";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";
import logger from "@/logging/logger";
import { navigationRoutes } from "@/enums/navigationRoutes";

const IndexPage = () => {
  const locale = useLocale();
  logger.info(`Hit route "/" -> Redirecting to ${locale}/home`);

  redirect(`${locale}${navigationRoutes.AUTH}`);
};

export default IndexPage;
