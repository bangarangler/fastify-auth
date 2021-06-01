import { randomBytes } from "crypto";

export async function createSession(userId: string, connection: any) {
  try {
    const sessionToken = randomBytes(43).toString("hex");

    const { ip, userAgent } = connection;

    const { session } = await import("../mongoConfig/mongo");
    const updates = {
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await session.insertOne(updates);

    return sessionToken;
  } catch (e) {
    console.error(e);
    throw new Error("session creation failed");
  }
}
