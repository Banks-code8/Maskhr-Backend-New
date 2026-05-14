// auth.service.js

import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
} from "./../models/user.repository.js";

import { hashPassword, comparePassword } from "./../utils/hash.js";
import { generateToken } from "./../utils/generateToken.js";

// ✅ REGISTER
export const register = async ({
  fullName,
  email,
  password,
  role = "user", // default role
}) => {
  const existing = await findUserByEmail(email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await hashPassword(password);

  const user = await createUser({
    fullName,
    email,
    password: hashed,
    role,
  });

  // remove password before returning
  user.password = undefined;

  return user;
};

// ✅ LOGIN
export const login = async ({ email, password }) => {
  const user = await findUserByEmailWithPassword(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken({
    id: user._id,
    role: user.role,
  });

  // remove password before returning
  user.password = undefined;

  return {
    accessToken,
    user,
  };
};
