import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FindOneParams } from 'src/common/helper/findOneParams.dto';
import { Auth } from 'src/api/auth/guards/auth.decorator';
import { Roles } from 'src/api/role/role.enum';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('/')
    getCategories() {
        return this.categoryService.getCategories();
    }

    @Get('/shop')
    getShopCategories() {
        return this.categoryService.getShopCategories();
    }

    @Auth(Roles.ADMIN)
    @Post('create')
    createCategory(@Body() body: CreateCategoryDto) {
        return this.categoryService.createCategory(body);
    }

    @Auth(Roles.ADMIN)
    @Patch('update')
    updateCategory(@Body() body: UpdateCategoryDto) {
        return this.categoryService.updateCategory(body);
    }

    @Auth(Roles.ADMIN)
    @Delete(':id')
    deleteCategory(@Param() params: FindOneParams){
        return this.categoryService.deleteCategory(params.id)
    }
}