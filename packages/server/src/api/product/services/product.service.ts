import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { errorMessages } from "src/errors/custom";
import { successObject } from "src/common/helper/sucess-response.interceptor";
import { Product } from "src/database/entities/product/product.entity";
import { Category } from "src/database/entities/category/category.entity";
import { ProductItem } from "src/database/entities/product/product_item.entity";
import { GetProductsDto } from "../dto/get-products.dto";
import { Variation } from "src/database/entities/variation/variation.entity";
import { VariationOption } from "src/database/entities/variation/variation_option.entity";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Variation)
    private readonly variationRepository: Repository<Variation>,
    @InjectRepository(VariationOption)
    private readonly variationOptionRepository: Repository<VariationOption>
  ) {}

  async getProduct(productId: number) {
    const product = await this.entityManager
      .createQueryBuilder(ProductItem, "product_items")
      .leftJoinAndSelect("product_items.product", "product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product_items.variations", "variationsOption")
      .leftJoinAndSelect("variationsOption.variation", "variations")
      .where("product_items.id = :productId", { productId })
      .getOne();

    if (!product) throw new NotFoundException(errorMessages.product.notFound);

    return product;
  }

  async searchProducts(query: any): Promise<ProductItem[]> {
    const { name } = query;
    const LIMIT = 3;

    const queryBuilder = this.entityManager
      .createQueryBuilder(ProductItem, "product_items")
      .leftJoinAndSelect("product_items.product", "product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product_items.variations", "variationsOption")
      .leftJoinAndSelect("variationsOption.variation", "variations");

    if (name) {
      queryBuilder.where("product.name LIKE :name", { name: `%${name}%` });
    }

    queryBuilder.take(LIMIT);

    const products: ProductItem[] = await queryBuilder.getMany();

    return products;
  }

  public async updateProduct(
    id: number,
    data: UpdateProductDto
  ): Promise<Product> {
    // Find the product by ID
    const product = await this.entityManager.findOne(Product, {
      where: { id },
      relations: [
        "category",
        "product_items",
        "product_items.variations",
        "product_items.variations.variation",
      ],
    });

    // Throw an error if the product is not found
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Update the product details
    if (data.category) {
      const category = await this.entityManager.findOne(Category, {
        where: { category_name: data.category },
      });

      // Throw an error if the category is not found
      if (!category) {
        throw new NotFoundException("Category not found");
      }

      product.category = category;
    }

    product.name = data.name ?? product.name;
    product.description = data.description ?? product.description;

    // Save the updated Product entity
    const savedProduct = await this.entityManager.save(product);

    // Find the related ProductItem entity
    const productItem = await this.entityManager.findOne(ProductItem, {
      where: { product: { id: savedProduct.id } },
      relations: ["variations", "variations.variation"],
    });

    if (!productItem) {
      throw new NotFoundException(`ProductItem for product ID ${id} not found`);
    }

    // Update ProductItem details
    productItem.product_image = data.product_image ?? productItem.product_image;
    productItem.SKU = data.SKU ?? productItem.SKU;
    productItem.qty_in_stock = data.qty_in_stock ?? productItem.qty_in_stock;
    productItem.price = data.price ?? productItem.price;

    // Update variations if provided
    if (data.variations) {
      const variations = [];

      for (const { name, value } of data.variations) {
        // Find the variation by name
        const variation = await this.variationRepository.findOne({
          where: { name },
        });

        if (!variation) {
          throw new NotFoundException(`Variation not found: ${name}`);
        }

        // Check if the variation option exists
        let variationOption = await this.variationOptionRepository.findOne({
          where: { value, variation },
        });

        if (!variationOption) {
          // Create a new variation option if it doesn't exist
          variationOption = this.variationOptionRepository.create({
            value,
            variation,
          });
          await this.variationOptionRepository.save(variationOption);
        }

        variations.push(variationOption);
      }

      productItem.variations = variations;
    }

    // Save the updated ProductItem entity
    await this.entityManager.save(productItem);

    return savedProduct;
  }

  async getArrivals():Promise<ProductItem[]> {
    const LIMIT = 8;
    const products = await this.entityManager
      .createQueryBuilder(ProductItem, "product_items")
      .leftJoinAndSelect("product_items.product", "product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product_items.variations", "variationsOption")
      .leftJoinAndSelect("variationsOption.variation", "variations")
      .limit(LIMIT)
      .getMany();

    return products;
  }

  async getProducts(requirements: GetProductsDto): Promise<any> {
    const {
      minPrice,
      maxPrice,
      page,
      pageSize,
      options,
      category,
      sort,
    } = requirements;

    const decodedOptions = options
      ? JSON.parse(decodeURIComponent(options))
      : [];

    const PAGE_SIZE = pageSize ? pageSize : 5;
    const PAGE = page ? page : 1;

    const queryBuilder = this.entityManager
      .createQueryBuilder(ProductItem, "product_items")
      .leftJoinAndSelect("product_items.product", "product")
      .leftJoinAndSelect("product.category", "category")
      .leftJoinAndSelect("product_items.variations", "variationsOption")
      .leftJoinAndSelect("variationsOption.variation", "variations");

    // Define the conditions array
    const conditions: { condition: string; parameters: any }[] = [];

    minPrice &&
      conditions.push({
        condition: "product_items.price >= :minPrice",
        parameters: { minPrice },
      });
    maxPrice &&
      conditions.push({
        condition: "product_items.price <= :maxPrice",
        parameters: { maxPrice },
      });
    category &&
      conditions.push({
        condition: "category.category_name = :category",
        parameters: { category },
      });

    for (const option of decodedOptions) {
      const variationName = option.name;
      const variationValues = option.variations;
      // Get variation by name
      const variation = await this.variationRepository.findOneBy({
        name: variationName,
      });
      if (!variation) continue;

      queryBuilder.andWhere(
        "variations.name = :variationName AND variationsOption.value IN (:...variationValues)",
        { variationName, variationValues }
      );
    }

    if (sort) {
      const validSortFields = ["name", "price"]; // Add other valid fields as needed
      if (validSortFields.includes(sort)) {
        queryBuilder.orderBy(`product_items.${sort}`, "ASC");
      }
    }

    // Apply the conditions to the query builder
    conditions.forEach(({ condition, parameters }) => {
      queryBuilder.andWhere(condition, parameters);
    });

    queryBuilder.offset((PAGE - 1) * PAGE_SIZE);
    queryBuilder.limit(PAGE_SIZE);

    const count = await queryBuilder.getCount();
    const data = await queryBuilder.getMany();

    return {
      products: [...data],
      pagination: {
        count,
        pageSize,
        page,
      },
    };
  }

  public async createProduct(data: CreateProductDto) {
    // Find the category
    const category = await this.entityManager.findOne(Category, {
      where: { category_name: data.category },
    });

    // Throw an error if the category is not found
    if (!category) {
      throw new NotFoundException(errorMessages.category.notFound);
    }

    // Create the Product entity
    const product = this.entityManager.create(Product, {
      category,
      name: data.name,
      description: data.description,
    });

    // Save the Product entity to get its ID
    const savedProduct = await this.entityManager.save(product);

    // Create the ProductItem entity
    const productItem = this.entityManager.create(ProductItem, {
      product_image: data.product_image,
      SKU: data.SKU,
      qty_in_stock: data.qty_in_stock,
      price: data.price,
      product: savedProduct, // Assign the saved Product entity to the ProductItem
    });

    const variations = [];

    for (const { name, value } of data.variations) {
      // Find the variation by name
      const variation: Variation = await this.variationRepository.findOneBy({
        name,
      });
      if (!variation) {
        throw new Error(`Variation not found: ${name}`);
      }
      // Create the new variation option
      const variationOption = this.variationOptionRepository.create({
        value,
        variation,
      });

      variations.push(variationOption);
      // Save the new variation option
      await this.variationOptionRepository.save(variationOption);
    }

    productItem.variations = variations;
    // Save the ProductItem entity
    return this.entityManager.save(productItem);
  }

  async deleteProduct(productId: number) {
    const result = await this.entityManager
      .createQueryBuilder()
      .delete()
      .from(ProductItem)
      .where("id = :productId", { productId })
      .execute();

    if (result.affected < 1)
      throw new NotFoundException(errorMessages.product.notFound);

    return successObject;
  }
}
