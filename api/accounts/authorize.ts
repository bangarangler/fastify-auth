import bcrypt from "bcryptjs";
const { compare } = bcrypt;

export async function authorizeUser(email: string, password: string) {
  const { user } = await import("../mongoConfig/mongo");

  const filter = { "email.address": email };
  const userData = await user.findOne(filter);

  const savedPassword = userData.password;

  const isAuthorized = await compare(password, savedPassword);

  return { isAuthorized, userId: userData._id };
}
