import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { ProductService } from "../services/product.service";
import { FindOneParams } from "src/common/helper/findOneParams.dto";
import { Roles } from "src/api/role/role.enum";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/arrivals")
  async getArrivals() {
    return this.productService.getArrivals();
  }

  @Get("/")
  async getProducts(@Query() query: any) {
    return this.productService.getProducts(query);
  }

  @Get("/sale")
  async getSaleProducts() {
    return this.productService.getSaleProducts();
  }

  @Post("search")
  async searchProducts(@Body() body: any) {
    return this.productService.searchProducts(body.name);
  }
  @Get(":id")
  async getProduct(@Param() product: FindOneParams) {
    return this.productService.getProduct(product.id);
  }

  @Patch(":id")
  async updateProduct(
    @Param() params: FindOneParams,
    @Body() body: UpdateProductDto
  ) {
    return this.productService.updateProduct(params.id, body);
  }

  @Auth(Roles.ADMIN, Roles.USER)
  @Post("create")
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Auth(Roles.ADMIN, Roles.USER)
  @Delete(":id")
  async deleteProduct(@Param() product: FindOneParams) {
    return this.productService.deleteProduct(product.id);
  }
}
