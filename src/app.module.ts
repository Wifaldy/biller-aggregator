import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './module/auth/auth.module';
import { OperatorModule } from './module/operator/operator.module';
import { PrefixOperatorModule } from './module/prefix-operator/prefix-operator.module';
import { PricePlanProductModule } from './module/price-plan-product/price-plan-product.module';
import { PricePlanModule } from './module/price-plan/price-plan.module';
import { ProductTypeModule } from './module/product-type/product-type.module';
import { ProductModule } from './module/product/product.module';
import { RoleModule } from './module/role/role.module';
import { UsersModule } from './module/user/user.module';
import { PartnerModule } from './module/partner/partner.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    RoleModule,
    AuthModule,
    OperatorModule,
    ProductTypeModule,
    ProductModule,
    PrefixOperatorModule,
    PricePlanModule,
    PricePlanProductModule,
    PartnerModule,
  ],
  controllers: [],
})
export class AppModule {}
