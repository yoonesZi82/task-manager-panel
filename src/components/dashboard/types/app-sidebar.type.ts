import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

interface NavMainItemsType {
  title: string;
  url: string;
}

interface NavMainUserType {
  name: string;
  email: string;
  avatar: string;
}

interface NavMainType {
  title?: string;
  name?: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isActive?: boolean;
  items?: NavMainItemsType[];
}
interface SidebarItemsProps {
  user: NavMainUserType;
  navMain: NavMainType[];
  setting?: NavMainType[];
  ai?: NavMainType[];
}

export type {
  NavMainItemsType,
  NavMainUserType,
  NavMainType,
  SidebarItemsProps,
};
