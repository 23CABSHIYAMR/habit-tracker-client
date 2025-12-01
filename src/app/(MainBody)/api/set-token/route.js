import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {token} = await req.json();
    const cookieStore=await cookies();
    cookieStore?.set("token", token, {
        httpOnly: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", 
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365 * 100, //100 years
      });
    return NextResponse.json({message: "Setted Token Successfully"})
}