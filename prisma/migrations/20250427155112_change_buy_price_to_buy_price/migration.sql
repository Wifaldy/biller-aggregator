/*
  Warnings:

  - You are about to drop the column `buyPrice` on the `product_suppliers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_suppliers" DROP COLUMN "buyPrice",
ADD COLUMN     "buy_price" INTEGER NOT NULL DEFAULT 0;
