"use server";

import { signOut } from "./authConfig";

export const handleSignOut = async () => {
  try {
    await signOut({ redirectTo: "/auth/sign-in" });
  } catch (error) {
    throw error;
  }
};
