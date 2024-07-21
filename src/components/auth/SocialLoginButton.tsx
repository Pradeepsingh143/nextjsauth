"use client";
import { useFormStatus } from "react-dom";
import LoadingButton from "../LoadingButton";

const SocialLoginButton: React.FC = () => {
  const { pending, data } = useFormStatus();
  const action = data?.get("action");
  
  return (
    <>
       <LoadingButton
        className="p-2 w-full rounded-sm bg-red-600 hover:bg-red-500 transition duration-100"
        type="submit"
        name="action"
        value="google"
        disabled={pending}
        loading={action === "google" && pending}
      >
       Sign In With Google
      </LoadingButton>
      <LoadingButton
        className="p-2 w-full rounded-sm transition duration-100" 
        type="submit"
        name="action"
        value="github"
        disabled={pending}
        loading={action === "github" && pending}
      >
       Sign In With Github
      </LoadingButton>
    </>
  );
};

export default SocialLoginButton;
