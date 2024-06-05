import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Country } from '../country/country.entity';
import { UserAddress } from './user-address.entity';

@Entity({name: 'address', schema: 'public'})
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  unit_number: string;

  @Column({ nullable: true })
  street_number: string;

  @Column()
  address_line1: string;

  @Column({ nullable: true })
  address_line2: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  postal_code: string;

  @OneToMany(() => UserAddress, userAddress => userAddress.address)
  userAddresses: UserAddress[];
    
  @ManyToOne(() => Country, country => country.addresses, {nullable: true})
  countries: Country;
}