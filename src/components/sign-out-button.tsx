"use client";

import { handleSignOut } from "@/lib/auth/signOutServerAction";

const SignoutButton = () => {
  return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignoutButton;
