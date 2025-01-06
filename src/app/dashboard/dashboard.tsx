import React from "react";
import SignoutButton from "@/components/sign-out-button";
import { headers } from "next/headers";

const Dashboard = async () => {
  const response = await fetch("https://localhost:3000/api/videos", {
    headers: new Headers(await headers()),
  });
  const videos = await response.json();
  console.log(videos);
  return (
    <div>
      Dashboard
      <SignoutButton />
      <div>{JSON.stringify(videos)}</div>
    </div>
  );
};

export default Dashboard;
