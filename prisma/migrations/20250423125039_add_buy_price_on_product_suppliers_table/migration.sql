/*
  Warnings:

  - Made the column `priority` on table `product_suppliers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product_suppliers" ADD COLUMN     "buy_price" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "is_active" SET DEFAULT false,
ALTER COLUMN "priority" SET NOT NULL,
ALTER COLUMN "priority" SET DEFAULT 0;
