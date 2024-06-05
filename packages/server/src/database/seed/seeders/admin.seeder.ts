import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/database/entities/role/role.entity";
import { User } from "src/database/entities/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeeder {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    async seed() {
        const data: Partial<User> = this.generateData();

        // Hash the password if it exists
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const adminUser = await this.userRepository.findOneBy({ email: data.email });
        if (adminUser) return;

        const adminRole = await this.roleRepository.findOneBy({ name: 'Admin' });
        data.roles = [adminRole]; 

        const user: User = await this.userRepository.create(data);
        await this.userRepository.save(user)
    }

    generateData(): Partial<User> {
        return {
            email: 'admin@gmail.com',
            password: '12345678', // You should hash this before saving to the database
            phone: '2132132',
            createdAt: new Date(),
            deletedAt: null, // Assuming it's null for active users
            fullname: 'Admin Peric'
        };
    }
}