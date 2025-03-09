import { IBaseRepository } from 'src/common/base.repository.interface';
import { IPartnerEntity } from 'src/entity/partner.entity';

export interface IPartnerRepository extends IBaseRepository<IPartnerEntity> {
  findByEmail(email: string): Promise<IPartnerEntity>;
}
