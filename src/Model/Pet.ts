import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export type Size = "small" | "medium" | "big";

export type Specie = "dog" | "cat";

export type Age = "puppy" | "young" | "adult";

export type Sex = "male" | "female";

export type Status = "lost" | "found" | "adopted";

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string; //UUID
  @Column({
    type: "enum",
    enum: ["small", "medium", "big"],
  })
  size!: Size;

  @Column({
    type: "enum",
    enum: ["dog", "cat"],
  })
  species!: Specie;

  @Column({
    type: "enum",
    enum: ["puppy", "young", "adult"],
  })
  age!: Age;

  @Column()
  img!: string;

  @Column()
  detail!: string;

  @Column()
  area!: string;

  @Column({
    type: "enum",
    enum: ["male", "female"],
  })
  sex!: Sex;

  @Column({
    type: "enum",
    enum: ["lost", "found", "adopted"],
  })
  status!: Status;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
