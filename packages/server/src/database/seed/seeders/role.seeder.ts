import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../../api/role/role.enum';
import { Role } from '../../entities/role/role.entity';
import { SeederInterface } from '../seed.interference';

@Injectable()
export class RolesSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async seed() {
    const roles = await this.rolesRepository.count();
    const ROLE_COUNT = Object.keys(Roles).length;
    const GENERATE_COUNT = ROLE_COUNT - roles;
    if (GENERATE_COUNT == 0) return;

    const data: Partial<Role>[] = this.generateData();
    await this.rolesRepository.upsert(data, {
      conflictPaths: ['id'],
    });
  }

  generateData(): Partial<Role>[] {
    const data: Partial<Role>[] = [];
    Object.keys(Roles).forEach((key) => {
      data.push({
        name: Roles[key],
      });
    });
    return data;
  }
}