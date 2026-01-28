"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Bot, Command, Settings2, SquareTerminal } from "lucide-react";

import NavMain from "./nav-main";
import NavSetting from "./nav-setting";
import NavUser from "./nav-user";
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
import { SidebarItemsProps } from "./types/app-sidebar.type";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const [sidebarItems, setSidebarItems] = useState<SidebarItemsProps | null>(
    null
  );

  const newSidebarItems = useMemo(() => {
    if (!session?.user) {
      const createNewSidebarItems: SidebarItemsProps = {
        user: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          avatar: session?.user?.avatarUrl || "",
        },
        navMain: [
          {
            title: "Project",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
              {
                title: "Create",
                url: "/dashboard/project/create",
              },
              {
                title: "All project",
                url: "/dashboard/project/all",
              },
            ],
          },
        ],
        ai: [
          {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
              {
                title: "Chat With AI",
                url: "/dashboard/ai/chat",
              },
              {
                title: "Setting AI",
                url: "/dashboard/ai/setting",
              },
            ],
          },
        ],
        setting: [
          {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings2,
          },
        ],
      };
      return createNewSidebarItems;
    }
  }, [session]);

  useEffect(() => {
    if (newSidebarItems) {
      setSidebarItems(newSidebarItems);
    } else {
      setSidebarItems(null);
    }
  }, [newSidebarItems]);

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
        {sidebarItems && (
          <>
            <NavMain items={sidebarItems.navMain} title="Projects" />
            <NavMain items={sidebarItems.ai} title="AI" />
            <NavSetting items={sidebarItems.setting} />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        {sidebarItems && <NavUser user={sidebarItems.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
