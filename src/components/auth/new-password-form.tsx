"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { PasswordInput } from "../ui/password-input";

import { FormWrapper } from "./form-wrapper";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewPasswordSchema } from "@/schemas";
import { api } from "@/trpc/react";

export const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const newPassword = api.auth.newPassword.useMutation();

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    newPassword.mutate({ token, values });
  };

  return (
    <FormWrapper
      header="Reset your password"
      subHeader="Please enter a new password for your account."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={newPassword.isLoading}
                      type="password"
                      withValidation={
                        form.formState.dirtyFields.password ||
                        form.formState.errors.password !== undefined
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={newPassword.error?.message} />
          <FormSuccess message={newPassword.data?.success} />
          <div className="space-y-3">
            <Button
              disabled={newPassword.isLoading}
              type="submit"
              className="w-full"
            >
              Reset password
            </Button>
            <Button className="w-full" type="button" variant="ghost">
              <Link href="/auth/login">Back to login</Link>
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
};
