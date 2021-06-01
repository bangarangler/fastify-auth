import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { createTokens } from "./tokens";
import {
  ROOT_DOMAIN,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  JWTSignature,
  isSecure,
} from "../constants";

export async function getUserFromCookies(request: any, reply: any) {
  try {
    const { user, session } = await import("../mongoConfig/mongo");
    if (request?.cookies?.accessToken) {
      const { accessToken } = request.cookies;

      // @ts-ignore
      const decodedAccessToken = jwt.verify(accessToken, JWTSignature);

      // @ts-ignore
      const filter = { _id: new ObjectId(decodedAccessToken?.userId) };
      return user.findOne(filter);
    }

    if (request?.cookes?.refreshToken) {
      const { refreshToken } = request.cookies;
      // @ts-ignore
      const { sessionToken } = jwt.verify(refreshToken, JWTSignature);

      const currentSession = await session.findOne({ sessionToken });

      if (currentSession.valid) {
        const currentUser = await user.findOne({
          _id: new ObjectId(currentSession.userId),
        });
        await refreshTokens(sessionToken, currentUser._id, reply);
        return currentUser;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export async function refreshTokens(
  sessionToken: any,
  userId: any,
  reply: any
) {
  try {
    // @ts-ignore
    const { accessToken, refreshToken } = await createTokens(
      sessionToken,
      userId
    );

    const now = new Date();

    const refreshExpires = now.setDate(now.getDate() + 30);

    reply
      .setCookie(REFRESH_TOKEN_NAME, refreshToken, {
        path: "/",
        domain: ROOT_DOMAIN,
        httpOnly: true,
        secure: isSecure,
        expires: refreshExpires,
      })
      .setCookie(ACCESS_TOKEN_NAME, accessToken, {
        path: "/",
        domain: ROOT_DOMAIN,
        httpOnly: true,
        secure: isSecure,
      });
  } catch (e) {
    console.error(e);
  }
}
