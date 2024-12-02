import { type FileRoutesByPath } from "@tanstack/react-router";
import { type LucideIcon } from "lucide-react";

export type TDropdownMenuConfig = {
  label: string;
  icon: LucideIcon;
  path: keyof FileRoutesByPath;
};
