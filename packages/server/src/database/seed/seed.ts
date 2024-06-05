import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed.module";
import { SeedService } from "./seed.service";


async function runSeeder(){
    const app = await NestFactory.create(SeedModule);
    const service = app.get(SeedService);
    await service.seed();
    app.close();
}

runSeeder();

