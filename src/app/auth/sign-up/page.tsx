import React from "react";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { createUser } from "./actions";

const SignUpPage = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/dashboard");
  }
  return (
    <form
      action={async (formData) => {
        "use server";
        const response = await createUser(formData);
        if (response.success === true) {
          redirect("/auth/sign-in");
        }
      }}
    >
      <label>Name</label>
      <input id="name" type="text" name="name" />
      <label>Email</label>
      <input id="email" type="email" name="email" />
      <label>Password</label>
      <input id="password" type="password" name="password" />
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpPage;
