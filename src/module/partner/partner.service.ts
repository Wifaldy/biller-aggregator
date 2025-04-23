import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  generateRandomPasswordString,
  generateRandomUsernameString,
} from 'src/common/generate.helper';
import { IRepository } from 'src/common/repository.types';
import { PricePlanService } from '../price-plan/price-plan.service';
import {
  IPartnerCreate,
  IPartnerResetCredentials,
  IPartnerResponse,
  IPartnerUpdate,
  PartnerDto,
} from './partner.dto';
import { IPartnerRepository } from './partner.repository.interface';

@Injectable()
export class PartnerService {
  constructor(
    @Inject(IRepository.IPartnerRepository)
    private partnerRepository: IPartnerRepository,
    private pricePlanService: PricePlanService,
  ) {}

  async findAll(): Promise<IPartnerResponse[]> {
    const datas = await this.partnerRepository.findAll();
    return datas.map((data) => PartnerDto.toDtoList(data));
  }

  async create(partner: IPartnerCreate): Promise<IPartnerResponse> {
    const [findByEmail] = await Promise.all([
      this.partnerRepository.findByEmail(partner.email),
      this.pricePlanService.findById(partner.pricePlanId),
    ]);
    if (findByEmail)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    const [hashedPassword, hashedPin] = await Promise.all([
      bcrypt.hash(partner.password, 12),
      bcrypt.hash(partner.pin, 12),
    ]);
    const createdPartner = await this.partnerRepository.create({
      ...partner,
      password: hashedPassword,
      pin: hashedPin,
    });
    return PartnerDto.toDto({
      ...createdPartner,
      pin: partner.pin,
      password: partner.password,
    });
  }

  async update(partner: IPartnerUpdate): Promise<IPartnerResponse> {
    await this.findById(partner.id);
    await this.pricePlanService.findById(partner.pricePlanId);
    const updatedPartner = await this.partnerRepository.update(
      partner.id,
      partner,
    );
    return PartnerDto.toDto(updatedPartner);
  }

  async findById(id: number): Promise<IPartnerResponse> {
    const findPartner = await this.partnerRepository.findById(id);
    if (!findPartner)
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    return PartnerDto.toDto(findPartner);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.partnerRepository.delete(id);
  }

  async resetCredentials(id: number): Promise<IPartnerResetCredentials> {
    await this.findById(id);
    const password = generateRandomPasswordString();
    const pin = generateRandomPasswordString();
    const username = generateRandomUsernameString();
    const [hashedPassword, hashedPin] = await Promise.all([
      bcrypt.hash(password, 12),
      bcrypt.hash(pin, 12),
    ]);
    await this.partnerRepository.update(id, {
      password: hashedPassword,
      pin: hashedPin,
      username,
    });
    return {
      password,
      pin,
      username,
    };
  }

  async topUpBalance(id: number, amount: number): Promise<IPartnerResponse> {
    const findPartner = await this.findById(id);
    const updatedBalance = findPartner.balance + amount;
    const updatedPartner = await this.partnerRepository.update(id, {
      balance: updatedBalance,
    });
    return PartnerDto.toDto(updatedPartner);
  }
}
