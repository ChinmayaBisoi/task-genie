import React from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { status } = useSession();
  const loading = status === "loading";
  const authenticated = status === "authenticated";

  if (loading || authenticated) return null;
  return (
    <Button
      onClick={() => {
        signIn("google");
      }}
      className={`h-full rounded-none bg-brand-light px-6 text-lg font-semibold hover:bg-brand-dark`}
    >
      Login
    </Button>
  );
};

export default Login;
