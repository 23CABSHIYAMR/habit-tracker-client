import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { error: "Missing token" },
      { status: 400 }
    );
  }

  const cookieStore =await cookies(); 

  cookieStore.set("token", token, {
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, 
  });

  return NextResponse.json({ message: "Token set successfully" });
}
