import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeIcon, LaptopMinimalCheck, LockIcon, MailIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Email or Phone",
    icon: <MailIcon className="size-4" />,
    content: (
      <div className="flex flex-col gap-2 w-full">
        <Input variant="lg" placeholder="Email or Phone ..." />
        <Button size="lg"> Send </Button>
      </div>
    ),
  },
  {
    id: 2,
    title: "Code",
    icon: <CodeIcon className="size-4" />,
    content: <div>Step 2 content</div>,
  },
  {
    id: 3,
    title: "New Password",
    icon: <LockIcon className="size-4" />,
    content: <div>Step 3 content</div>,
  },
  {
    id: 4,
    title: "Result",
    icon: <LaptopMinimalCheck className="size-4" />,
    content: <div>Step 4 content</div>,
  },
];

export default steps;
