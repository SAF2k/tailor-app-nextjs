import { db } from "@/db";
import { Users, users } from "@/db/schema";
import { hash, validatePassword } from "@/lib/hash";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log("email", email);
  
  const result: Users[] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (result) {
    const passwordMatch = await validatePassword(password, result[0].password);
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
