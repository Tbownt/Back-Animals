import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Veterinary extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  @Column()
  image!: string;
  @Column()
  name!: string;
  @Column()
  description?: string;
  @Column()
  phone!: number;
  @Column("decimal", { array: true })
  location?: string[];
  @Column()
  address!: string;
  @Column()
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
