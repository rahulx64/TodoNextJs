// ✅ /src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { validateUser } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = await validateUser(username, password);
  if (!user)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  const token = signToken({ username });
  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("token", token, { httpOnly: true });
  return res;
}
