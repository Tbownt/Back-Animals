import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
} from "typeorm";

export type Category = "otros" | "indumentaria" | "tazas" | "alimentos";

@Entity()
export class Product extends BaseEntity {
	@Column({
		type: "enum",
		enum: ["otros", "indumentaria", "tazas", "alimentos"],
	})
	Category!: Category;

	@PrimaryGeneratedColumn("uuid")
	id!: string;
	@Column()
	image!: string;
	@Column()
	name!: string;
	@Column()
	description?: string; //se puede poner ? en vex de !
	@Column()
	price!: number;
	@Column()
	stock!: number;

	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;
}
