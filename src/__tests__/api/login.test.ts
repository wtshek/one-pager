/**
 * @jest-environment node
 */

import { POST } from "@/app/api/auth/login/route";
import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  ...jest.requireActual("../../__mocks__/lib/prisma"),
}));
jest.mock("@/lib/auth");

describe("POST /api/auth/login", () => {
  it("should return a token for valid credentials", async () => {
    const mockUser = { id: 1, passwordHash: "hashedPassword" };
    const mockToken = "mockToken";

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue(mockToken);

    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ email: "test@example.com", password: "password" }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual({ token: mockToken });
  });

  it("should return unauthorized for invalid email", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "invalid@example.com",
        password: "password",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual({ error: "Invalid credentials" });
  });

  it("should return unauthorized for invalid password", async () => {
    const mockUser = { id: 1, passwordHash: "hashedPassword" };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (verifyPassword as jest.Mock).mockResolvedValue(false);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "test@example.com",
        password: "wrongPassword",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual({ error: "Invalid credentials" });
  });
});
