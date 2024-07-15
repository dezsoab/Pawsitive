import React from "react";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

const IndexPage = () => {
  const locale = useLocale();
  redirect(`${locale}/home`);
};

export default IndexPage;
