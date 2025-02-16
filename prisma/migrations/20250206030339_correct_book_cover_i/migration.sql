/*
  Warnings:

  - You are about to drop the column `coveI` on the `Book` table. All the data in the column will be lost.
  - Added the required column `coverI` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "coveI",
ADD COLUMN     "coverI" TEXT NOT NULL;
