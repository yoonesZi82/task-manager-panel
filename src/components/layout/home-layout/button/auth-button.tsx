"use client";
import ButtonTheme from "@/components/change-theme/button-theme";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { LayoutDashboard, LogOut, Settings, User2 } from "lucide-react";
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
                <Avatar className="rounded-full size-10">
                  <AvatarImage
                    src={session?.user?.avatarUrl}
                    alt="avatarUrl"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User2 size={16} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <p className="font-medium text-sm truncate">
                  {" "}
                  {session?.user?.name}{" "}
                </p>
                <span className="text-xs truncate">{session?.user.email}</span>
              </div>
            </div>
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
              <Link href="dashboard/account">
                <User2 />
                <span>account</span>
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
