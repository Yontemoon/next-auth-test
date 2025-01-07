import { createUser } from "./actions";
import { redirect } from "next/navigation";

const SignUp = async () => {
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

export { SignUp };
