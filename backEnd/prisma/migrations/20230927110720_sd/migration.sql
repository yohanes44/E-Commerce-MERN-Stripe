-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_orderId_fkey`;

-- AlterTable
ALTER TABLE `cart` MODIFY `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
