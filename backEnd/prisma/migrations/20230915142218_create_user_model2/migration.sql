/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `username` VARCHAR(255) NOT NULL,
    MODIFY `firstName` VARCHAR(255) NOT NULL,
    MODIFY `lastName` VARCHAR(255) NOT NULL;
