import { NextResponse } from "next/server";
import { createUser } from "@/lib/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = await createUser(username, password);
  if (!user)
    return NextResponse.json({ message: "User exists" }, { status: 400 });
  return NextResponse.json({ message: "User registered" });
}

