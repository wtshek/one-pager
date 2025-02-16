/**
 * @jest-environment node
 */

import { POST } from "@/app/api/auth/register/route";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { RESPONSE_STATUS } from "@/const";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  ...jest.requireActual("../../__mocks__/lib/prisma"),
}));
jest.mock("@/lib/auth");

describe("POST /api/auth/register", () => {
  it("should register a new user successfully", async () => {
    const mockHashedPassword = "mockHashedPassword";

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (hashPassword as jest.Mock).mockResolvedValue(mockHashedPassword);
    (prisma.user.create as jest.Mock).mockResolvedValue({});

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "newuser@example.com",
        password: "password",
        username: "newuser",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual({
      message: "User registered successfully",
    });
    expect(response.status).toBe(RESPONSE_STATUS.CREATED);
  });

  it("should return an error if the user already exists", async () => {
    const mockUser = { id: 1, email: "existing@example.com" };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

    const req = {
      json: jest.fn().mockResolvedValue({
        email: "existing@example.com",
        password: "password",
        username: "existinguser",
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual({ error: "User already exists" });
    expect(response.status).toBe(RESPONSE_STATUS.BAD_REQUEST);
  });
});
