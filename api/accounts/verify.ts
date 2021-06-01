import crypto from "crypto";
import { ROOT_DOMAIN, JWTSignature } from "../constants";

export async function createVerifyEmailToken(email: string) {
  try {
    const authString = `${JWTSignature}:${email}`;
    return crypto.createHash("sha256").update(authString).digest("hex");
  } catch (e) {
    console.log("e :>> ", e);
  }
}

export async function createVerifyEmailLink(email: string) {
  try {
    const emailToken: any = await createVerifyEmailToken(email);
    const URIencodedEmail = encodeURIComponent(email);
    // return `https://${ROOT_DOMAIN}/verify/${URIencodedEmail}/${emailToken}`
    return `http://${ROOT_DOMAIN}/verify/${URIencodedEmail}/${emailToken}`;
  } catch (e) {
    console.error(e);
  }
}

export async function validateVerifyEmail(token: string, email: string) {
  try {
    const emailToken = await createVerifyEmailToken(email);
    const isValid = emailToken === token;
    if (isValid) {
      const { user } = await import("../mongoConfig/mongo");
      const filter = { "email.address": email };
      const update = { $set: { "email.verified": true } };
      await user.updateOne(filter, update);
      return true;
    }
    return false;
  } catch (err) {
    console.log("err", err);
    return false;
  }
}
