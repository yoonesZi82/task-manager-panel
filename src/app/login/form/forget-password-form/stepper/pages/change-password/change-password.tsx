"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import passwordSchema from "./schema/password.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PasswordInput from "@/components/input/password-input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "./actions/change-password-action";
import { useToast } from "@/hooks/use-toast";
import { useStepper } from "@/context/stepper/StepperContext";
import { LoaderCircle } from "lucide-react";

function ChangePassword() {
  const toast = useToast();
  const { next, data: stepperData } = useStepper();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const mutation = useMutation({
    mutationFn: changePasswordAction,
    onSuccess: (result) => {
      if (result.ok) {
        toast.add({
          title: "Success",
          description: "Password update successfully",
          type: "success",
        });
        next();
      } else if (result.status !== 500) {
        toast.add({
          title: "Warning",
          description: result.message,
          type: "warning",
        });
      }
    },
    onError: () => {
      toast.add({
        title: "Error",
        description: "Something went wrong",
        type: "error",
      });
    },
  });

  const { isPending, mutate } = mutation;

  const changePassword = (data: z.infer<typeof passwordSchema>) => {
    mutate({ data, email: stepperData.contact, phone: stepperData.contact });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(changePassword)}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput variant="lg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput variant="lg" isShowRules={false} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          Change Password
          {isPending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : null}
        </Button>
      </form>
    </Form>
  );
}

export default ChangePassword;
