/*
  Warnings:

  - You are about to drop the column `description` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description";
