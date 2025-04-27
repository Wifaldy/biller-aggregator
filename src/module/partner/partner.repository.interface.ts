import { IBaseRepository } from 'src/common/base.repository.interface';
import { PartnerEntity } from 'src/entity/partner.entity';

export interface IPartnerRepository extends IBaseRepository<PartnerEntity> {
  findByEmail(email: string): Promise<PartnerEntity>;
}
