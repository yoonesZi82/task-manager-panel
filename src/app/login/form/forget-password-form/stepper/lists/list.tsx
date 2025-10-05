import StepType from "@/context/stepper/types/step.type";
import { LaptopMinimalCheck, LockIcon, Mail, MailIcon } from "lucide-react";
import EmailOrPhone from "../pages/mail-or-phone/email-or-phone";
import OtpForm from "../pages/otp-form/OtpForm";
import ChangePassword from "../pages/change-password/change-password";
import Result from "../pages/result/result";

const steps: StepType[] = [
  {
    id: 1,
    icon: <MailIcon className="size-4" />,
    content: <EmailOrPhone />,
  },
  {
    id: 2,
    icon: <Mail className="size-4" />,
    content: <OtpForm />,
  },
  {
    id: 3,
    icon: <LockIcon className="size-4" />,
    content: <ChangePassword />,
  },
  {
    id: 4,
    icon: <LaptopMinimalCheck className="size-4" />,
    content: <Result />,
  },
];

export default steps;
