// user.repository.js

import User from "./user.model.js";

// ✅ normal user lookup (without password)
export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

// ✅ login lookup (includes password)
export const findUserByEmailWithPassword = async (email) => {
  return User.findOne({ email }).select("+password");
};

// ✅ create user
export const createUser = async (data) => {
  return User.create(data);
};
