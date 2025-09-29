import React from "react";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDirection } from "@radix-ui/react-direction";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function NotificationSheet() {
  const direction = useDirection();
  console.log(direction);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="md"
          className="justify-start px-2 w-full font-normal text-foreground"
        >
          <Bell />
          Notifications
        </Button>
      </SheetTrigger>
      <SheetContent dir={direction}>
        <SheetHeader>
          <SheetTitle>Quick Feedback</SheetTitle>
          <SheetDescription>
            Share your feedback to help us improve.
          </SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div>body</div>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" className="w-full" size="lg" asChild>
              <Link href="/dashboard/notification">Show all notifications</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationSheet;
