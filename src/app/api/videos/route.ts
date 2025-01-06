// import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/authConfig";

// THIS ROUTE IS PROTECTED

export const GET = auth(async function GET(req) {
  try {
    console.log("REQ AUTH", req.auth);
    if (!req.auth) {
      throw new Error("Not Authenticated");
    }

    return NextResponse.json({
      data: [1, 2, 3, 4, 5, 6, 7, 8],
    });
  } catch (error) {
    console.error("Error in /api/videos", error);
    return NextResponse.json({
      message: error,
      status: 400,
    });
  }
});
