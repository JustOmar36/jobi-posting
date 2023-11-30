import bcrypt from "bcryptjs";

export const passwordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const comparePassword = async (password, hashedPassword) => {
  const valid = await bcrypt.compare(password, hashedPassword);
  return valid;
};
