import Signin from "./Signin";
import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const SigninPage = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    return <Signin />;
  }
};

export default SigninPage;
