"use client";
import React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const data = session?.user
    ? {
        user: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          avatar: session?.user?.avatarUrl || "",
        },
        navMain: [
          {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
              {
                title: "History",
                url: "#",
              },
              {
                title: "Starred",
                url: "#",
              },
              {
                title: "Settings",
                url: "#",
              },
            ],
          },
          {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
              {
                title: "Genesis",
                url: "#",
              },
              {
                title: "Explorer",
                url: "#",
              },
              {
                title: "Quantum",
                url: "#",
              },
            ],
          },
          {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
              {
                title: "Introduction",
                url: "#",
              },
              {
                title: "Get Started",
                url: "#",
              },
              {
                title: "Tutorials",
                url: "#",
              },
              {
                title: "Changelog",
                url: "#",
              },
            ],
          },
          {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
              {
                title: "General",
                url: "#",
              },
              {
                title: "Team",
                url: "#",
              },
              {
                title: "Billing",
                url: "#",
              },
              {
                title: "Limits",
                url: "#",
              },
            ],
          },
        ],
        navSecondary: [
          {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
          },
          {
            title: "Feedback",
            url: "#",
            icon: Send,
          },
        ],
        projects: [
          {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
          },
          {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
          },
          {
            name: "Travel",
            url: "#",
            icon: Map,
          },
        ],
      }
    : null;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex justify-center items-center bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="flex-1 grid text-sm text-left leading-tight">
                  <span className="font-medium truncate">Acme Inc</span>
                  <span className="text-xs truncate">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data && <NavMain items={data.navMain} />}
        {data && <NavProjects projects={data.projects} />}
        {data && <NavSecondary items={data.navSecondary} />}
      </SidebarContent>
      <SidebarFooter>{data && <NavUser user={data.user} />}</SidebarFooter>
    </Sidebar>
  );
}
