import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Variation } from "src/database/entities/variation/variation.entity";
import { EntityManager, Repository } from "typeorm";
import { CreateVariationDto } from "../dto/create-variation.dto";
import { Category } from "src/database/entities/category/category.entity";
import { DeleteVariationDto } from "../dto/delete-variation.dto";
import { errorMessages } from "src/errors/custom";
import { successObject } from 'src/common/helper/sucess-response.interceptor';
import { VariationOption } from "src/database/entities/variation/variation_option.entity";
import { CreateVariationOptionDto, CreateVariationOptionsDto } from "../dto/add-variations.dto";


@Injectable()
export class VariationService {
    constructor(
        @InjectRepository(Variation)
        private readonly variationRepository: Repository<Variation>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(VariationOption)
        private readonly variationOptionRepository: Repository<VariationOption>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }

    async getVariation(id: number) {
        return this.variationRepository.findOne({
            where: { id },
            relations: ['options']
        });
    }

    async getVariationsCategory(data):Promise<Variation[]>{
        console.log(data);
        const categoryName = data.category ? data.category : null;
        if (categoryName){
            const category:Category = await this.categoryRepository.findOne({where: {category_name: categoryName}});
            const variations:Variation[] = await this.variationRepository.find({where: {category}, relations: ['options']});
            return variations;
        }

        return this.variationRepository.find({relations: ['options']});
    }

    async createVariation({ category, name }: CreateVariationDto): Promise<Variation> {
        // Find the category by name
        const categoryFound: Category = await this.categoryRepository.findOneBy({ category_name: category });
        if (!categoryFound) {
            throw new Error(`Category not found: ${category}`);
        }

        // Create the new variation
        const variation: Variation = this.variationRepository.create({ name });
        variation.category = categoryFound;

        // Save and return the new variation
        return this.variationRepository.save(variation);
    }

    async addVariationOption({ variationId, value }: CreateVariationOptionDto): Promise<VariationOption> {
        // Find the variation by id
        const variationFound: Variation = await this.variationRepository.findOneBy({ id: variationId });
        if (!variationFound) {
            throw new Error(`Variation not found: ${variationId}`);
        }

        // Find  the variation option by value
        const variationOptionFound: VariationOption = await this.variationOptionRepository.findOneBy({ value });
        if (variationOptionFound) {
            throw new Error(`Variation option already exists: ${value}`);
        }

        // Create the new variation
        const variationOption: VariationOption = await this.variationOptionRepository.create({ value });
        variationOption.variation = variationFound;

        // Save and return the new variation
        return this.variationOptionRepository.save(variationOption);
    }

    async addVariationOptions({ options }: CreateVariationOptionsDto): Promise<VariationOption[]> {
        const variationOptions: VariationOption[] = [];

        for (const dto of options) {
            const { variationId, value } = dto;

            // Find the variation by id
            const variationFound: Variation = await this.variationRepository.findOneBy({ id: variationId });
            if (!variationFound) {
                throw new Error(`Variation not found: ${variationId}`);
            }

            // Find  the variation option by value
            const variationOptionFound: VariationOption = await this.variationOptionRepository.findOneBy({ value });
            if (variationOptionFound) {
                throw new Error(`Variation option already exists: ${value}`);
            }

            // Create the new variation option
            const variationOption: VariationOption = await this.variationOptionRepository.create({ value });
            variationOption.variation = variationFound;

            variationOptions.push(variationOption);
        }

        // Save and return the new variation options
        return this.variationOptionRepository.save(variationOptions);
    }

    async deleteVariation({ id }: DeleteVariationDto) {
        const result = await this.entityManager
            .createQueryBuilder()
            .delete()
            .from(Variation)
            .where('id = :id', { id })
            .execute();

        if (result.affected < 1)
            throw new NotFoundException(errorMessages.product.notFound);

        return successObject;
    }
}