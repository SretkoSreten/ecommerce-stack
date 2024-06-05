export class CreateReviewDto {
    rating_value: number;
    comment: string;
}

export class UpdateReviewDto {
    rating_value?: number;
    comment?: string;
}