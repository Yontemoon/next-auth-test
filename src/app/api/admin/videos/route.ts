import { auth } from "@/lib/auth/authConfig";
import { NextResponse } from "next/server";

export const GET = auth(async function GET() {
  try {
    return NextResponse.json({
      data: {
        admin: "admin role",
        important: "foo",
      },
    });
  } catch (error) {
    console.error("Error in /api/admin/videos", error);
    return NextResponse.json({
      message: "Error occured",
      status: 400,
    });
  }
});
