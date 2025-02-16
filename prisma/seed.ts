import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import OpenBookSearchResult from "../others/openLibraryBookSearchResult.json";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const password = "password";
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        email: faker.internet.email(),
        passwordHash: passwordHash,
        avatarUrl: faker.image.avatar(),
        bio: faker.lorem.sentence(),
      },
    });
    users.push({ ...user, password });
  }

  // Create Books
  const books = [];
  for (let i = 0; i < 10; i++) {
    const searchResult = OpenBookSearchResult[i];
    const book = await prisma.book.create({
      data: {
        openBookKey: searchResult.key,
        title: searchResult.title,
        authorKey: searchResult.author_key,
        authorName: searchResult.author_name,
        coverEditionKey: searchResult.cover_edition_key || "",
        coverI: String(searchResult.cover_i),
        editionCount: String(searchResult.edition_count),
        firstPublishYear: String(searchResult.first_publish_year),
        hasFullText: searchResult.has_fulltext,
        ia: searchResult.ia,
        iaCollectionS: searchResult.ia_collection_s || "",
        language: searchResult.language,
        publicScanB: searchResult.public_scan_b,
      },
    });
    books.push(book);
  }

  // Create Posts
  for (let i = 0; i < 10; i++) {
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        authorId: users[i % users.length].id,
        bookId: books[i % books.length].id,
        published: faker.datatype.boolean(),
        views: faker.number.int({ min: 0, max: 1000 }),
        likes: faker.number.int({ min: 0, max: 500 }),
        publishedAt: faker.date.past(),
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
