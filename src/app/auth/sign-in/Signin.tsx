import React from "react";
import { handleGoogleSignin } from "@/lib/auth/googleSignInServerAction";
import { signIn } from "@/lib/auth/authConfig";

const Signin = () => {
  return (
    <div>
      <h1>Signin</h1>
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
      <button onClick={handleGoogleSignin}>Sign in with Google</button>
    </div>
  );
};

export default Signin;
