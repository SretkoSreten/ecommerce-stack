import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category/category.entity";
import { EntityManager, In, Not, Repository } from "typeorm";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Product } from "src/database/entities/product/product.entity";
import { errorMessages } from "src/errors/custom";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async getCategories() {
    const categories: Category[] = await this.categoryRepository.find({
      where: { parent: null },
      relations: ["parent"],
    });
    const categoriesParentNot = categories.filter(
      (category) => category.parent === null
    );
    return categoriesParentNot;
  }

  async getShopCategories(): Promise<Category[]> {
    // Fetch all categories with their parent relations
    const categories = await this.categoryRepository.find({
      relations: ["parent"],
    });

    // Initialize result array
    const result: Category[] = [];

    for (const category of categories) {
      const { parent } = category;

      if (parent) {
        // Fetch subcategories of the current category's parent
        const subcategories = await this.categoryRepository.find({
          where: { parent },
        });

        // Remove parent from the result array if it exists
        result.splice(
          result.findIndex((item) => item.id === parent.id),
          1
        );

        // Create a new data object for the parent category
        const parentData: any = {
          id: parent.id,
          category_name: parent.category_name,
          subcategories: subcategories,
        };

        // Add the parent category to the result array
        result.push(parentData);
      } else {
        // Add the top-level category to the result array
        result.push(category);
      }
    }

    return result;
  }

  async createCategory({
    parentId,
    name,
  }: CreateCategoryDto): Promise<Category> {
    // Initialize the new category
    const newCategory = this.categoryRepository.create({ category_name: name });

    // If parentId is provided, find the parent category
    if (parentId) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: parentId },
      });

      if (!parentCategory) {
        throw new Error(`Parent category not found: ${parentId}`);
      }

      // Set the parent category
      newCategory.parent = parentCategory;
    }

    // Save the new category
    return this.categoryRepository.save(newCategory);
  }

  async updateCategory({
    id,
    name,
    parentId,
  }: UpdateCategoryDto): Promise<Category> {
    // Find the category by id
    const category: Partial<Category> = await this.categoryRepository.findOne({
      where: { id },
      relations: ["parent"],
    });

    if (!category) {
      throw new NotFoundException(`Category not found: ${id}`);
    }

    // Update the name if provided
    if (name) {
      category.category_name = name;
    }

    // Update the parent category if parentId is provided
    if (parentId !== undefined) {
      if (parentId === null) {
        // If parentId is null, remove the parent category
        category.parent = null;
      } else {
        // Otherwise, find the new parent category
        const parentCategory = await this.categoryRepository.findOne({
          where: { id: parentId },
        });

        if (!parentCategory) {
          throw new NotFoundException(`Parent category not found: ${parentId}`);
        }

        // Set the new parent category
        category.parent = parentCategory;
      }
    }

    // Save the updated category
    return this.categoryRepository.save(category);
  }

  async deleteCategory(categoryId: number) {
    const result = await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :id", { id: categoryId })
      .execute();

    if (result.affected < 1)
      throw new NotFoundException(errorMessages.category.notFound);

    return successObject;
  }
}
