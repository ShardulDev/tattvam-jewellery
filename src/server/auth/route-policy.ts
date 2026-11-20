const PUBLIC_AUTH_ENDPOINTS = new Set([
  "GET /get-session",
  "POST /sign-in/email",
  "POST /sign-out",
]);

export function isPublicAuthEndpoint(method: string, pathname: string): boolean {
  const endpoint = pathname.replace(/^\/api\/auth/, "");
  return PUBLIC_AUTH_ENDPOINTS.has(`${method.toUpperCase()} ${endpoint}`);
}
