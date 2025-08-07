import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload)
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });

    return handler(req, payload);
  };
}
