"use client";
import { credentialsLoginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import ApiError from "@/lib/ApiError";
import { signInSchema } from "@/lib/zodValidation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../LoadingButton";
import { useRouter } from "next/navigation";

type SignInFormValues = z.infer<typeof signInSchema>;

const CredentialsLoginForm = () => {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const res = await credentialsLoginAction(formData);
      if (!res?.success) {
        throw new ApiError(res.statusCode, res.message);
      } else {
        toast({
          title: res.message,
        });
        router.push("/");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        switch (error.statusCode) {
          case 404:
            form.setError("email", {
              type: "custom",
              message: "User doesn't exist",
            });
            break;

          case 400:
            form.setError("password", {
              type: "custom",
              message: "Invalid Login crendentials",
            });
            break;

          default:
            form.setError("root", { type: "custom", message: error.message });
            break;
        }
      } else {
        form.setError("root", {
          type: "custom",
          message: "Error: Server Response !Failed",
        });
      }
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <LoadingButton type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
          <Button
            type="button"
            variant={"link"}
            className="text-slate-700 dark:text-white"
            asChild
          >
            <Link href={"/forgot-password"}>Forgot Password</Link>
          </Button>
        </div>
      </form>
      <p className="mt-4 text-base text-red-500">
        {form && errors.root?.message}
      </p>
    </Form>
  );
};

export default CredentialsLoginForm;
