import { db } from "@/db";
import { type InsertUser, type User, user } from "@/db/schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { hashPassword } from "./utils";

export const getUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  return await db.query.user.findFirst({
    where: eq(user.email, email),
  });
};

export const getUserById = async (id: string) => {
  return await db.query.user.findFirst({
    where: eq(user.id, id),
  });
};

export const createUser = async (values: InsertUser & { password: string }) => {
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(values.password, salt);

  const [creatdUser] = await db
    .insert(user)
    .values({
      ...values,
      password: hash,
      salt,
    })
    .returning();

  return creatdUser;
};

export const deleteUser = async (id: string, trx = db) => {
  await trx.delete(user).where(eq(user.id, id));
};

export const updateUser = async (
  id: string,
  values: Partial<User>,
  trx = db,
) => {
  const [updatedUser] = await trx
    .update(user)
    .set(values)
    .where(eq(user.id, id))
    .returning();

  return updatedUser;
};

export const updateUserPassword = async (
  userId: string,
  password: string,
  trx = db,
) => {
  const salt = crypto.randomBytes(128).toString("base64");
  const hash = await hashPassword(password, salt);
  await updateUser(userId, { password: hash, salt }, trx);
};

export const verifyPassword = async (
  plainTextPassword: string,
  salt: string,
  hashedPassword: string,
) => {
  const hash = await hashPassword(plainTextPassword, salt);
  return hashedPassword === hash;
};
