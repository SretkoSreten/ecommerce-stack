import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Auth } from "src/api/auth/guards/auth.decorator";
import { Roles } from "src/api/role/role.enum";
import { CurrentUser } from "src/api/auth/guards/user.decorator";
import { User } from "src/database/entities/user/user.entity";
import { ReviewService } from "../services/review.service";
import { CreateReviewDto } from "../dto/review.dto";

@Controller('reviews')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ){}

    @Auth(Roles.USER, Roles.ADMIN)
    @Get(':id')
    async getReview(
        @Param() params: any
    ){
        return this.reviewService.getReview(params.id)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Post('create/:id')
    async createReview(
        @Param() params: any,
        @CurrentUser() user: User,
        @Body() body: CreateReviewDto
    ){
        return this.reviewService.createReview(user, params.id, body)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Patch('update/:id')
    async updateReview(
        @Param() params: any,
        @Body() body: CreateReviewDto
    ){
        return this.reviewService.updateReview(params.id, body)
    }

    @Auth(Roles.USER, Roles.ADMIN)
    @Delete(':id')
    async deleteReview(
        @Param() params: any
    ){
        return this.reviewService.deleteReview(params.id)
    }
}