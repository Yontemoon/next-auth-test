import { NextResponse } from "next/server";

// THIS ROUTE IS PROTECTED

export const GET = async function GET() {
  try {
    return NextResponse.json({
      data: {
        user: "user role",
        important: "bar",
      },
    });
  } catch (error) {
    console.error("Error in /api/videos", error);
    return NextResponse.json({
      message: "Error occured",
      status: 400,
    });
  }
};
