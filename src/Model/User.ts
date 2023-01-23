import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export type Role = "admin" | "user";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  name!: string;
  @Column()
  surname!: string;
  @Column()
  email!: string;
  @Column()
  username!: string;
  @Column()
  phone!: number;
  @Column({
    type: "enum",
    enum: ["admin", "user"],
  })
  role!: Role;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
