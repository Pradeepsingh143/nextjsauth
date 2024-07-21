"use server"
import { socialLoginAction } from "@/actions/auth.actions";
import SocialLoginButton from "./SocialLoginButton";

const SocialLogin: React.FC = () => {
  return ( 
    <form action={socialLoginAction} className="flex flex-col md:flex-row gap-2">
      <SocialLoginButton/>
    </form>
  );
};

export default SocialLogin;