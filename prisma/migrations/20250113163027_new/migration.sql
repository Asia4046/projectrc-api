/*
  Warnings:

  - You are about to drop the column `IsAdmin` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "IsAdmin",
ALTER COLUMN "subject" DROP NOT NULL;
