-- CreateEnum
CREATE TYPE "BalanceType" AS ENUM ('DEPOSIT', 'SETTLEMENT');

-- CreateTable
CREATE TABLE "mitras" (
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

    CONSTRAINT "mitras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mitras_email_key" ON "mitras"("email");

-- AddForeignKey
ALTER TABLE "mitras" ADD CONSTRAINT "mitras_price_plan_id_fkey" FOREIGN KEY ("price_plan_id") REFERENCES "price_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
