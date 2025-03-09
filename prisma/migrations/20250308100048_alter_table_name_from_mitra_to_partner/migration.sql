/*
  Warnings:

  - You are about to drop the `mitras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mitras" DROP CONSTRAINT "mitras_price_plan_id_fkey";

-- DropTable
DROP TABLE "mitras";

-- CreateTable
CREATE TABLE "partners" (
    "id" SERIAL NOT NULL,
    "price_plan_id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "balance_type" "BalanceType" NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "pin" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partners_email_key" ON "partners"("email");

-- AddForeignKey
ALTER TABLE "partners" ADD CONSTRAINT "partners_price_plan_id_fkey" FOREIGN KEY ("price_plan_id") REFERENCES "price_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
