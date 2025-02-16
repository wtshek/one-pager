/**
 * @jest-environment node
 */

import { POST } from "@/app/api/posts/route";
import { prisma } from "@/lib/prisma";
import { RESPONSE_STATUS } from "@/const";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  ...jest.requireActual("../../__mocks__/lib/prisma"),
}));

describe("POST /api/posts", () => {
  it("should create a new post and return it", async () => {
    const mockBook = { id: 1, key: "bookKey" };
    const mockPost = {
      id: 1,
      title: "Post Title",
      content: "Post Content",
      bookId: mockBook.id,
    };

    (prisma.book.findFirst as jest.Mock).mockResolvedValue(mockBook);
    (prisma.post.create as jest.Mock).mockResolvedValue(mockPost);

    const req = {
      json: jest.fn().mockResolvedValue({
        post: { title: "Post Title", content: "Post Content" },
        book: { key: "bookKey" },
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual(mockPost);
    expect(response.status).toBe(RESPONSE_STATUS.CREATED);
  });

  it("should create a new book if it does not exist and then create a post", async () => {
    const newBook = { id: 2, key: "newBookKey" };
    const mockPost = {
      id: 2,
      title: "New Post Title",
      content: "New Post Content",
      bookId: newBook.id,
    };

    (prisma.book.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.book.create as jest.Mock).mockResolvedValue(newBook);
    (prisma.post.create as jest.Mock).mockResolvedValue(mockPost);

    const req = {
      json: jest.fn().mockResolvedValue({
        post: { title: "New Post Title", content: "New Post Content" },
        book: {
          key: "newBookKey",
          title: "New Book Title",
          author_key: "authorKey",
          author_name: "Author Name",
        },
      }),
    } as unknown as Request;

    const response = await POST(req);

    expect(await response.json()).toEqual(mockPost);
    expect(response.status).toBe(RESPONSE_STATUS.CREATED);
  });
});
