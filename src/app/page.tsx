import SignInButton from "@/components/sign-in-button";
import React from "react";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";

// ! This is the home page if no user is signed in,
// ! if signed in, redirect to dashboard page.
const HomePage = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center m-auto h-screen w-full align-middle">
      Home!
      <SignInButton />
    </div>
  );
};

export default HomePage;
