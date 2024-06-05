import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/api/user/services/user.service';
import { errorMessages } from 'src/errors/custom';
import { Role } from 'src/database/entities/role/role.entity';
import { AssignRoleDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    private readonly userService: UserService,
  ) {}

  async assignRoleToUser(data: AssignRoleDto) {
    const role = await this.findById(data.name);
    const user = await this.userService.findById(data.userId);
    user.roles = [role];
    return this.userService.save(user);
  }

  async findById(name: string) {
    const role = await this.rolesRepository.findOne({
      where: {
        name
      },
    });
    if (!role) {
      throw new NotFoundException(errorMessages.role.notFound);
    }
    return role;
  }
}