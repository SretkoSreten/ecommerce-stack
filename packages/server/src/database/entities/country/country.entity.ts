import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Address } from '../address/address.entity';

@Entity({name: 'country', schema: 'public'})
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Address, address => address.countries)
  addresses: Address[];
}
