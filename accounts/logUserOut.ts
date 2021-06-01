import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  JWTSignature,
} from "../constants";

export async function logUserOut(request: any, reply: any) {
  try {
    const { session } = await import("../mongoConfig/mongo");

    if (request?.cookies?.REFRESH_TOKEN_NAME) {
      const { refreshToken } = request.cookies;

      // @ts-ignore
      const { sessionToken } = jwt.verify(refreshToken, JWTSignature);

      await session.deleteOne({ sessionToken });
    }

    reply.clearCookie(REFRESH_TOKEN_NAME).clearCookie(ACCESS_TOKEN_NAME);
  } catch (e) {
    console.error(e);
  }
}
