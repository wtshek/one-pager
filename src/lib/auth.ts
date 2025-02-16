import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_secret_key";

// Hash password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// Compare password
export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

// Generate JWT
export function generateToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: "7d" });
}

// Verify JWT
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
