import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { CreateUserDto } from 'src/api/auth/dto/create-user.dto';
import { Role } from 'src/database/entities/role/role.entity';
import { errorMessages } from 'src/errors/custom';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  public async createUser(
    body: CreateUserDto,
    ...roles: Role[]
  ): Promise<User> {
    body.password = await hash(body.password, 10);
    const user: Partial<User> = await this.repository.create({
      ...body,
      roles,
    });
    
    return this.repository.save(user);
  }

  public async findByEmail(
    email: string
  ): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        email,
      }
    });
    return user;
  }

  public async findByName(
    name: string
  ): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        fullname: name,
      }
    });
    return user;
  }

  public async comparePassword(password, userPassword): Promise<boolean> {
    return compare(password, userPassword);
  }

  public async findById(id: number): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        id,
      },
      relations: ['roles']
    });
    if (!user) {
      throw new NotFoundException(errorMessages.user.notFound);
    }
    return user;
  }

  public async save(user: User) {
    return this.repository.save(user);
  }
}