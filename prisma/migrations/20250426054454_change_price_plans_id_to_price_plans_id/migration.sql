/*
  Warnings:

  - You are about to drop the column `price_plansId` on the `partners` table. All the data in the column will be lost.
  - You are about to drop the column `price_plansId` on the `price_plan_products` table. All the data in the column will be lost.
  - Added the required column `price_plans_id` to the `partners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_plans_id` to the `price_plan_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "partners" DROP CONSTRAINT "partners_price_plansId_fkey";

-- DropForeignKey
ALTER TABLE "price_plan_products" DROP CONSTRAINT "price_plan_products_price_plansId_fkey";

-- AlterTable
ALTER TABLE "partners" DROP COLUMN "price_plansId",
ADD COLUMN     "price_plans_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "price_plan_products" DROP COLUMN "price_plansId",
ADD COLUMN     "price_plans_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "price_plan_products" ADD CONSTRAINT "price_plan_products_price_plans_id_fkey" FOREIGN KEY ("price_plans_id") REFERENCES "price_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_price_plans_id_fkey" FOREIGN KEY ("price_plans_id") REFERENCES "price_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
