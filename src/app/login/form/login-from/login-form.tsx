import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import LoginSchema from "./schema/login-schema";
import PasswordInput from "@/components/input/password-input";
import { signIn } from "next-auth/react";
import { Github, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function LoginForm() {
  const { replace } = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      toast.add({
        title: "Error",
        description: "Email or Password is not correct",
        type: "error",
      });
    } else {
      toast.add({
        title: "Success",
        description: "Your login was successful",
        type: "success",
      });
      setTimeout(() => {
        replace("/dashboard");
      }, 3000);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
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
                <PasswordInput isShowRules={false} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            Login {isLoading ? <LoaderCircle className="animate-spin" /> : null}
          </Button>
          <div className="flex justify-center items-center gap-2 lg:gap-5 w-full">
            <Button
              type="button"
              className="w-1/2 lg:w-full"
              size="lg"
              variant="outline"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/dashboard" })
              }
            >
              Login With Google
            </Button>
            <Button
              type="button"
              className="w-1/2 lg:w-full"
              size="lg"
              variant="outline"
              onClick={() =>
                signIn("github", { redirect: true, callbackUrl: "/dashboard" })
              }
            >
              Login With Github
              <Github />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
