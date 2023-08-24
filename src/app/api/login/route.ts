import { db } from "@/db";
import { Users, users } from "@/db/schema";
import { hash, validatePassword } from "@/lib/hash";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  console.log(username, password);

  const result: Users[] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
    
    
  if (result) {
    const passwordMatch = password === result[0].password
    console.log(passwordMatch);
       
    if (!passwordMatch)
      return NextResponse.json(
        {
          status: "failure",
          message: "Invalid credentials",
        },
        { status: 404 }
      );
    return NextResponse.json({
      status: "success",
      message: "Login successful",
      data: result[0],
    });
  } else {
    return NextResponse.json(
      {
        status: "failure",
        message: "Invalid credentials",
      },
      { status: 404 }
    );
  }
}
