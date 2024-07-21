"use server";
import SocialLoginForm from "@/components/auth/SocialLoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-10">
      <h1 className="text-2xl">Create a new account</h1>
      <div className="w-full space-y-4 sm:w-[420px]">
        {/* <SignUpForm /> */}
        <div className="flex w-full items-center gap-2">
          <span className="flex-grow border-t border-gray-300" />
          <span>Or</span>
          <span className="flex-grow border-t border-gray-300" />
        </div>
        <SocialLoginForm />
        <div className="flex justify-center">
          <Button type="button" variant={"link"} asChild>
            <Link href={"/signin"}>Already have an account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
