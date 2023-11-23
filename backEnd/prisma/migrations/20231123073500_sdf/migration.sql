-- AlterTable
ALTER TABLE `cart` ADD COLUMN `deleted` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `deleted` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `productvariation` ADD COLUMN `deleted` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `wishlist` ADD COLUMN `deleted` INTEGER NOT NULL DEFAULT 0;
