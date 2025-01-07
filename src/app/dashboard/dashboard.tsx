// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import SignoutButton from "@/components/sign-out-button";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/authConfig";
const Dashboard = async () => {
  const authInfo = await auth();

  let videos = null;

  if (authInfo?.user?.role === "USER") {
    const response = await fetch("https://localhost:3000/api/videos", {
      headers: new Headers(await headers()),
    });
    videos = await response.json();
    console.log(videos);
  } else if (authInfo?.user?.role === "ADMIN") {
    const response = await fetch("https://localhost:3000/api/admin/videos", {
      headers: new Headers(await headers()),
    });
    videos = await response.json();
  }

  return (
    <div>
      Dashboard
      <SignoutButton />
      <div>{JSON.stringify(videos)}</div>
    </div>
  );
};

export default Dashboard;
