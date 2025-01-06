"use server";

import { auth } from "./authConfig";

export const checkIsAuthenticated = async () => {
  const session = await auth();
  console.log("SESSION", session);

  if (session) {
    return true;
  } else {
    return false;
  }
};
