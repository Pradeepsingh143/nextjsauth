"use server";

import CredentialsLoginForm from "@/components/auth/CredentialsLoginForm";
import SocialLoginForm from "@/components/auth/SocialLoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SignIn() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-2xl">Login your account</h1>
      <div className="w-full sm:w-[420px]">
        <div className="login-form w-full space-y-4">
          <CredentialsLoginForm />
          <div className="flex items-center gap-2">
            <span className="flex-grow border-t border-gray-300" />
            <span>Or</span>
            <span className="flex-grow border-t border-gray-300" />
          </div>
          <SocialLoginForm />
          <div className="flex justify-center">
            <Button
              type="button"
              variant={"link"}
              asChild
              className="text-slate-700 dark:text-white"
            >
              <Link href={"/signup"}>Don&apos;t have an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
