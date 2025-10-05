import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RegisterSchema from "./schema/register-schema";
import PasswordInput from "@/components/input/password-input";
import { useToast } from "@/hooks/use-toast";
import { StepType } from "../../types/step.type";
import CustomButton from "@/components/button/CustomButton";
import { registerAction } from "./actions/register-action";

function RegisterForm({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<StepType>>;
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      setIsLoading(true);

      const result = await registerAction(data);

      if (result.ok) {
        toast.add({
          title: "Success",
          description: "Your registration was successful",
          type: "success",
        });
        form.reset();
        setTimeout(() => setStep("login"), 3000);
      } else if (result.status === 400) {
        toast.add({
          title: "Warning",
          description: "This email is already registered",
          type: "warning",
        });
      } else {
        toast.add({
          title: "Error",
          description: result.message,
          type: "error",
        });
      }
    } catch (err) {
      toast.add({
        title: "Error",
        description: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name address ..." variant="lg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input placeholder="Phone number ..." variant="lg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email address ..."
                  variant="lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput name="confirmPassword" isShowRules={false} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center gap-2.5">
          <CustomButton
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            Login
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
