import { navigationRoutes } from "@/enums/navigationRoutes";

export const isActivePath = (path: navigationRoutes, currentPath: string) => {
  if (!currentPath) {
    return false;
  }
  const lastPathSection = currentPath.lastIndexOf("/");
  return path.includes(currentPath.substring(lastPathSection));
};
