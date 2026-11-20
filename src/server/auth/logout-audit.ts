export async function recordLogoutAudit<Session extends { user: { id: string } }>(
  headers: Headers,
  loadSession: (headers: Headers) => Promise<Session | null>,
  record: (userId: string) => Promise<void>,
): Promise<void> {
  const session = await loadSession(headers);
  if (session) await record(session.user.id);
}
