"use client";
import ButtonTheme from "@/components/change-theme/button-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BellRing,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  User,
  User2,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="lg" className="rounded-lg">
            <User2 />
            {session?.user?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {/* Account Section */}
          <DropdownMenuLabel className="flex justify-between items-center gap-4 w-full">
            <div className="flex items-center gap-2">
              {status === "loading" ? (
                <Skeleton className="rounded-full w-10 h-10" />
              ) : (
                <Avatar>
                  <AvatarImage src={session?.user?.avatarUrl} alt="avatarUrl" />
                  <AvatarFallback>
                    <User2 size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col gap-1">
                <p className="font-medium text-sm"> {session?.user?.name} </p>
                <Badge
                  shape="circle"
                  size="sm"
                  variant="secondary"
                  className="!w-fit"
                >
                  Pro User
                </Badge>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              shape="circle"
              className="relative"
              asChild
            >
              <Link href="#">
                <BellRing />
                <Badge
                  variant="primary"
                  shape="circle"
                  size="sm"
                  className="top-0 absolute -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 start-full"
                >
                  5
                </Badge>
              </Link>
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="dashboard/profile">
                <User />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          {/* Logout */}
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
            <LogOut />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="lg:hidden block">
        <ButtonTheme />
      </div>
    </div>
  );
}
