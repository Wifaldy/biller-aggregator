/*
  Warnings:

  - You are about to drop the column `operator_id` on the `price_plan_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "price_plan_products" DROP CONSTRAINT "price_plan_products_operator_id_fkey";

-- AlterTable
ALTER TABLE "price_plan_products" DROP COLUMN "operator_id",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
