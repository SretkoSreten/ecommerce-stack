import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { FindOneParams } from "src/common/helper/findOneParams.dto";
import { Roles } from "src/api/role/role.enum";
import { CreateVariationDto } from "../dto/create-variation.dto";
import { VariationService } from "../services/variation.service";
import {
  CreateVariationOptionDto,
  CreateVariationOptionsDto,
} from "../dto/add-variations.dto";

@Controller("variations")
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Get("shop")
  async getVariationsCategory(@Query() query: any) {
    return this.variationService.getVariationsCategory(query);
  }

  @Get(":id")
  async getVariation(@Param() variation: FindOneParams) {
    return this.variationService.getVariation(variation.id);
  }

  @Auth(Roles.ADMIN)
  @Post("create")
  async createVariation(@Body() body: CreateVariationDto) {
    return this.variationService.createVariation(body);
  }

  @Auth(Roles.ADMIN)
  @Post("add-option")
  async addVariation(@Body() body: CreateVariationOptionDto) {
    return this.variationService.addVariationOption(body);
  }

  @Auth(Roles.ADMIN)
  @Post("add-options")
  async addVariations(@Body() body: CreateVariationOptionsDto) {
    return this.variationService.addVariationOptions(body);
  }

  @Auth(Roles.ADMIN, Roles.USER)
  @Delete(":id")
  async deleteVariation(@Param() variation: FindOneParams) {
    return this.variationService.deleteVariation(variation);
  }


}
