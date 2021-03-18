import bcrypt from 'bcryptjs';

export const encryptPassword = async (pass: string) =>
  await bcrypt.hash(pass, 3);

export const verifyPassword = async (hash: string, pass: string) =>
  await bcrypt.compare(pass, hash);
