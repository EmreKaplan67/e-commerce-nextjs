import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export async function proxy(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (authHeader == null) return false;
  if (!authHeader.startsWith("Basic ")) return false;
  try {
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    return (
      username === process.env.ADMIN_USERNAME &&
      (await isValidPassword(
        password,
        process.env.HASHED_ADMIN_PASSWORD as string
      ))
    );
  } catch (error) {
    console.error("Error validating authentication:", error);
    return false;
  }
}

export const config = {
  matcher: "/admin/:path*",
};
