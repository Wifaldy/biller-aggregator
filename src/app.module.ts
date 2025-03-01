import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UsersModule } from './module/user/user.module';
import { RoleModule } from './module/role/role.module';
import { AuthModule } from './module/auth/auth.module';
import { OperatorModule } from './module/operator/operator.module';
import { ProductTypeModule } from './module/product-type/product-type.module';
import { ProductModule } from './module/product/product.module';
import { PrefixOperatorModule } from './module/prefix-operator/prefix-operator.module';

@Module({
  imports: [CommonModule, UsersModule, RoleModule, AuthModule, OperatorModule, ProductTypeModule, ProductModule, PrefixOperatorModule],
  controllers: [],
})
export class AppModule {}
