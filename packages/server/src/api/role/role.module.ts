import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { RoleService } from './services/role.service';
import { UserService } from '../user/services/user.service';
import { Role } from 'src/database/entities/role/role.entity';
import { User } from 'src/database/entities/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User]), UserModule],
  providers: [RoleService, UserService],
  exports: [RoleService],
})
export class RoleModule {}