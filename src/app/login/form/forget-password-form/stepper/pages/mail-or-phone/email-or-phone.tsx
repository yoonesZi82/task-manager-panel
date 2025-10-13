"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepper } from "@/context/stepper/StepperContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import emailOrPhoneSchema from "./schema/form.schema";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { emailOrPhoneAction } from "./actions/form-action";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

function EmailOrPhone() {
  const toast = useToast();
  const { next, setData } = useStepper();

  const form = useForm<z.infer<typeof emailOrPhoneSchema>>({
    resolver: zodResolver(emailOrPhoneSchema),
    defaultValues: { contact: "" },
  });

  const mutation = useMutation({
    mutationFn: emailOrPhoneAction,
    onSuccess: (result) => {
      if (result.ok) {
        toast.add({
          title: "Success",
          description: "Send code for you please check your email or phone",
          type: "success",
        });
        next();
      } else if (result.status === 404) {
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

  const Send = (data: z.infer<typeof emailOrPhoneSchema>) => {
    setData({ contact: data.contact });
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(Send)}
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email or Phone</FormLabel>
              <FormControl>
                <Input
                  variant="lg"
                  placeholder="Email or Phone ..."
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <span>Sending...</span>
              <LoaderCircle className="size-4 animate-spin" />
            </>
          ) : (
            "Send"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EmailOrPhone;
