"use server";

import { signIn } from "@/lib/auth/authConfig";

export const handleGoogleSignin = async () => {
  try {
    await signIn("google", {
      redirectTo: "/dashboard",
    });
  } catch (error) {
    throw error;
  }
};
