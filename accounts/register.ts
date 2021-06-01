import bcrypt from "bcryptjs";

const { genSalt, hash } = bcrypt;

export async function registerUser(email: string, password: string) {
  const { user } = await import("../mongoConfig/mongo");

  const salt = await genSalt(10);

  const hashedPassword = await hash(password, salt);

  const updates = {
    email: { address: email, verified: false },
    password: hashedPassword,
  };
  const result = await user.insertOne(updates);

  return result.insertedId;
}
