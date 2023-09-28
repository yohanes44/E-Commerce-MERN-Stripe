-- DropForeignKey
ALTER TABLE `user_role` DROP FOREIGN KEY `User_role_userId_fkey`;

-- AddForeignKey
ALTER TABLE `User_role` ADD CONSTRAINT `User_role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
