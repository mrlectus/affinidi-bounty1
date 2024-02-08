/*
  Warnings:

  - You are about to alter the column `imageUrl` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "imageUrl" SET DATA TYPE VARCHAR(1000);
