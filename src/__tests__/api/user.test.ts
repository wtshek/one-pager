/**
 * @jest-environment node
 */

import {
  GET as getUser,
  PUT as updateUser,
  DELETE as deleteUser,
} from "@/app/api/users/[id]/route";
import { GET as getUsers, POST as createUser } from "@/app/api/users/route";
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  ...jest.requireActual("../../__mocks__/lib/prisma"),
}));

describe("User API", () => {
  describe("GET /api/users", () => {
    it("should return a list of users", async () => {
      const mockUsers = [
        { id: 1, name: "John Doe", email: "john@example.com" },
      ];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const response = await getUsers();

      expect(await response.json()).toEqual(mockUsers);
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const req = {
        json: jest
          .fn()
          .mockResolvedValue({ name: "John Doe", email: "john@example.com" }),
      } as unknown as Request;

      const response = await createUser(req);

      expect(await response.json()).toEqual(mockUser);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a user by ID", async () => {
      const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const req = {} as unknown as Request;
      const params = { id: "1" };

      const response = await getUser(req, { params });

      expect(await response.json()).toEqual(mockUser);
    });

    it("should return 404 if user not found", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const req = {} as unknown as Request;
      const params = { id: "999" };

      const response = await getUser(req, { params });

      expect(await response.json()).toEqual({ error: "User not found" });
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update a user by ID", async () => {
      const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
      (prisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const req = {
        json: jest
          .fn()
          .mockResolvedValue({ name: "John Doe", email: "john@example.com" }),
      } as unknown as Request;
      const params = { id: "1" };

      const response = await updateUser(req, { params });

      expect(await response.json()).toEqual(mockUser);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user by ID", async () => {
      (prisma.user.delete as jest.Mock).mockResolvedValue({});

      const req = {} as unknown as Request;
      const params = { id: "1" };

      const response = await deleteUser(req, { params });

      expect(await response.json()).toEqual({ message: "User deleted" });
    });
  });
});
