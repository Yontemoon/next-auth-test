"use client";

import { useRouter } from "next/navigation";
const SignInButton = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <button
      className={props.className}
      onClick={() => router.push("/auth/sign-in")}
    >
      {props.children || "Sign in"}
    </button>
  );
};

export default SignInButton;
