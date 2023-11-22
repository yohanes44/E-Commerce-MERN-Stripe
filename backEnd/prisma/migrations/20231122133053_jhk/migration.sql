/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted` INTEGER NOT NULL DEFAULT 0;
