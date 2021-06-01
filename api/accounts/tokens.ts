import jwt from "jsonwebtoken";
import { JWTSignature } from "../constants";

export async function createTokens(sessionToken: any, userId: any) {
  try {
    // @ts-ignore
    const refreshToken = jwt.sign({ sessionToken }, JWTSignature);

    // @ts-ignore
    const accessToken = jwt.sign({ sessionToken, userId }, JWTSignature);

    return { accessToken, refreshToken };
  } catch (e) {
    console.error(e);
    return;
  }
}
