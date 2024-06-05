import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { Category } from '../category/category.entity';
import { VariationOption } from './variation_option.entity';

@Entity()
export class Variation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Category, category => category.variations, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    category: Category;

    @OneToMany(() => VariationOption, option => option.variation)
    options: VariationOption[];
}