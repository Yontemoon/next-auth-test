import React from "react";
import Dashboard from "./dashboard";
import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

// ! This route is protected
const DashboardPage = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <Dashboard />;
  }
};

export default DashboardPage;
