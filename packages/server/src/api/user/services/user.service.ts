import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user/user.entity";
import { CreateUserDto } from "src/api/auth/dto/create-user.dto";
import { Role } from "src/database/entities/role/role.entity";
import { errorMessages } from "src/errors/custom";
import { UpdateUserAuthBody } from "../dto/update-user.dto";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>
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

  public async getUserAuth(user: User) {
    return this.repository.findOne({
      where: { id: user.id },
      select: ["fullname", "email", "phone"],
    });
  }

  public async updateUserAuth(
    user: User,
    body: UpdateUserAuthBody
  ): Promise<any> {
    const data = { ...body };
    delete data.confirmPassword;

    // Hash the password if it exists
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      await this.repository.update({ id: user.id }, data);
      return successObject;
    } catch (error) {
      throw new NotFoundException(errorMessages.user.notFound);
    }
  }

  public async findByEmail(email: string): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async deleteAccount(user: User) {
    const userFound = await this.repository.findOne({ where: { id: user.id } });
    if (!userFound) {
      throw new NotFoundException(errorMessages.user.notFound);
    }
    await this.repository.remove(userFound);
  }

  public async findByName(name: string): Promise<User> {
    const user: User = await this.repository.findOne({
      where: {
        fullname: name,
      },
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
      relations: ["roles"],
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
