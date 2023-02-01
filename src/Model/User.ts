import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity,
	OneToMany,
} from "typeorm";

import { Pet } from "./Pet";

export type Role = "admin" | "user";
export type Status = "active" | "banned";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;
	@Column()
	name!: string;
	@Column()
	surname!: string;
	@Column()
	email!: string;
	@Column()
	username!: string;
	@Column({ type: "bigint" })
	phone!: string;
	@Column({
		type: "enum",
		enum: ["admin", "user"],
	})
	role!: Role;
	@Column({
		type: "enum",
		enum: ["active", "banned"],
	})
	status!: Status
	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Pet, (pet) => pet.user)
	pet!: Pet[];
}
