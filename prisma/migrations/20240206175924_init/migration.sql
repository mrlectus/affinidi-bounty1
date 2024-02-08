/*
  Warnings:

  - You are about to drop the column `description` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "productId",
DROP COLUMN "quantity",
DROP COLUMN "sex";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cartId" INTEGER,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
