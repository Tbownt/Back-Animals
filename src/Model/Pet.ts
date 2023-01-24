import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export type Size = "pequeño" | "mediano" | "grande";

export type Specie = "perro" | "gato";

export type Age = "cachorro" | "joven" | "adulto";

export type Sex = "macho" | "hembra";

export type Status = "perdido" | "encontrado" | "adoptado";

@Entity()
export class Pet extends BaseEntity {
  //uuid funcionando
  @PrimaryGeneratedColumn("uuid")
  id!: string
  
  @Column({
    type: "enum",
    enum: ["pequeño", "mediano", "grande"],
  })
  size!: Size;

  @Column({
    type: "enum",
    enum: ["perro", "gato"],
  })
  species!: Specie;

  @Column({
    type: "enum",
    enum: ["cachorro", "joven", "adulto"],
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
    enum: ["macho", "hembra"],
  })
  sex!: Sex;

  @Column({
    type: "enum",
    enum: ["perdido", "encontrado", "adoptado"],
  })
  status!: Status;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
