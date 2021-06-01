import { createSession } from "./session";
import { refreshTokens } from "./user";

export async function logUserIn(userId: any, request: any, reply: any) {
  const connectionInformation = {
    ip: request.ip,
    userAgent: request.headers["user-agent"],
  };

  const sessionToken = await createSession(userId, connectionInformation);

  await refreshTokens(sessionToken, userId, reply);
}
