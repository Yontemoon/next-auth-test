"use client";

import { handleSignOut } from "@/lib/auth/signOut";

const SignoutButton = () => {
  return <button onClick={handleSignOut}>Sign out</button>;
};

export default SignoutButton;
