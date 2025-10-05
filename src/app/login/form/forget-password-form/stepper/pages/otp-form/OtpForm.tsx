import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import otpSchema from "./schema/otp.schema";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from "@/context/stepper/StepperContext";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, SendIcon } from "lucide-react";

function OtpForm() {
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);
  const { next } = useStepper();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const Send = (data: z.infer<typeof otpSchema>) => {
    setIsPending(true);
    const testOtp = "123456";

    if (data.otp === testOtp) {
      setTimeout(() => {
        setIsPending(false);
      }, 3000);
      toast.add({
        type: "success",
        title: "Success",
        description: "You are enter valid code",
      });
      next();
    } else {
      setTimeout(() => {
        setIsPending(false);
      }, 3000);
      toast.add({
        type: "error",
        title: "Error",
        description: "You are enter not valid code",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(Send)}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-xol justify-center items-center w-full">
              <FormControl>
                <InputOTP maxLength={6} disabled={isPending} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Send a 6 digit code for you in email or phone pleas enter this
                filed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2 w-full">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span>Sending...</span>
                <LoaderCircle className="size-4 animate-spin" />
              </>
            ) : (
              "Send"
            )}
          </Button>
          {/* <Button type="button" variant="dim" size="md" className="w-full">
            Resend
            <SendIcon />
          </Button> */}
        </div>
      </form>
    </Form>
  );
}

export default OtpForm;
