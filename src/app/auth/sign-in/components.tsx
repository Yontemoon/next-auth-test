import Link from "next/link";
import { handleCredSignIn, handleGoogleSignin } from "./actions";

const Signin = async () => {
  return (
    <div>
      <h1>Signin</h1>
      <form action={handleCredSignIn}>
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
      <Link href={"/auth/sign-up"}>
        <p>Don&apos;t have an account?</p>
      </Link>
    </div>
  );
};

export { Signin };
