-- CreateTable
CREATE TABLE "price_plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "price_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_plan_products" (
    "id" SERIAL NOT NULL,
    "price_plan_id" INTEGER NOT NULL,
    "operator_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sell_price" INTEGER NOT NULL DEFAULT 0,
    "margin" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "price_plan_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "price_plan_products" ADD CONSTRAINT "price_plan_products_price_plan_id_fkey" FOREIGN KEY ("price_plan_id") REFERENCES "price_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_plan_products" ADD CONSTRAINT "price_plan_products_operator_id_fkey" FOREIGN KEY ("operator_id") REFERENCES "operators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_plan_products" ADD CONSTRAINT "price_plan_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
