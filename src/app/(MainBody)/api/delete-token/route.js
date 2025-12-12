import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    const response = NextResponse.json({ message: "Token deleted" });

    response.cookies.set("token", null, {
      path: "/",
      expires: new Date(0), 
    });
  
    return response
}