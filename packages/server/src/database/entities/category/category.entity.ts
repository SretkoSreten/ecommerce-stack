import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../product/product.entity';
import { Variation } from '../variation/variation.entity';

@Entity({ name: 'category', schema: 'public' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @ManyToOne(() => Category, category => category.children, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    parent: Category; 

    @OneToMany(() => Category, category => category.parent)
    children: Category[];

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @OneToMany(() => Variation, variation => variation.category)
    variations: Variation[];
}
