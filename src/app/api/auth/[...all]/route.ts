import { NextResponse, type NextRequest } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";
import { getAuthServices } from "@/server/auth";
import { isPublicAuthEndpoint } from "@/server/auth/route-policy";
import { recordLogoutAudit } from "@/server/auth/logout-audit";
import { adminAuthEvents } from "@/server/db/schema";

export const runtime = "nodejs";

async function handlePost(request: NextRequest) {
  if (!isPublicAuthEndpoint(request.method, new URL(request.url).pathname)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const { auth, database } = getAuthServices();
  if (request.method === "POST" && new URL(request.url).pathname.endsWith("/sign-out")) {
    await recordLogoutAudit(
      request.headers,
      (headers) => auth.api.getSession({ headers }),
      async (userId) => {
        await database.insert(adminAuthEvents).values({
          id: crypto.randomUUID(),
          event: "LOGOUT",
          actorId: userId,
        });
      },
    );
  }
  return toNextJsHandler(auth).POST(request);
}

export const GET = (request: NextRequest) => {
  if (!isPublicAuthEndpoint(request.method, new URL(request.url).pathname)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const { auth } = getAuthServices();
  return toNextJsHandler(auth).GET(request);
};

export const POST = handlePost;
