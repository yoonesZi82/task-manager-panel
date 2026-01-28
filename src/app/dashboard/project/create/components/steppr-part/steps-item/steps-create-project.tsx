import StepType from "@/context/stepper/types/step.type";
import { LaptopMinimalCheck, LockIcon, Mail, MailIcon } from "lucide-react";
import ChoseTypeProject from "../pages/chose-type-project/ChoseTypeProject";

const stepsCrateProject = () => {
  const steps: StepType[] = [
    {
      id: 1,
      icon: <MailIcon className="size-4" />,
      content: <ChoseTypeProject />,
    },
    {
      id: 2,
      icon: <Mail className="size-4" />,
      content: <div>1</div>,
    },
    {
      id: 3,
      icon: <LockIcon className="size-4" />,
      content: <div>2</div>,
    },
    {
      id: 4,
      icon: <LaptopMinimalCheck className="size-4" />,
      content: <div>3</div>,
    },
  ];
  return steps;
};

export default stepsCrateProject;
