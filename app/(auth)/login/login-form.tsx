"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/validation/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";

import { ErrorContext } from "@better-fetch/fetch";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [pendingCredentials, setPendingCredentials] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCredentialsSignIn = async (
    values: z.infer<typeof signInSchema>
  ) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPendingCredentials(true);
        },
        onSuccess: async () => {
          router.push("/");
          toast("Berhasil masuk", {
            description: "Anda akan dipindahkan ke halaman utama",
          });
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          toast("Ada yang salah", {
            description: ctx.error.message ?? "Ada sesuatu yang salah",
          });
        },
      }
    );
    setPendingCredentials(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCredentialsSignIn)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Kehadiran Tercatat, Proses Belajar Terpantau</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Masuk untuk memantau kehadiran dengan praktis
          </p>
        </div>
        <div className="grid gap-6">
            {["email", "password"].map((field) => (
            <FormField
                control={form.control}
                key={field}
                name={field as keyof z.infer<typeof signInSchema>}
                render={({ field: fieldProps }) => (
                <FormItem>
                    <FormLabel>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    </FormLabel>
                    <FormControl>
                    <Input
                        type={field === "password" ? "password" : "text"}
                        placeholder={`Masukkan ${field} anda`}
                        {...fieldProps}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            ))}
        </div>
        {pendingCredentials ? (
          <Button disabled className="w-full" type="submit">
            <LoaderCircleIcon
              className="-ms-1 animate-spin"
              size={16}
              aria-hidden="true"
            />
            Login...
          </Button>
        ) : (
          <Button className="w-full" type="submit">
            Login Sekarang
          </Button>
        )}
      </form>
    </Form>
  );
}
