import React from "react";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { SignUp } from "./components";

const SignUpPage = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return <SignUp />;
};

export default SignUpPage;
