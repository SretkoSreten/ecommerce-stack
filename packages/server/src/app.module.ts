import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './database/typeorm/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { configuration } from './config';
import { SeedService } from './database/seed/seed.service';
import { SeedModule } from './database/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    SeedModule,
    ApiModule
  ] 
})
export class AppModule {
  constructor(private readonly seederService: SeedService) {}

  async onModuleInit() {
    console.log('Module initialization...');
    await this.seederService.seed();
    console.log('Data seeding completed.');
  }
}
