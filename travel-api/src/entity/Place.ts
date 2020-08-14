import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"


@ObjectType({ description: "Destination or place of interest" })
@Entity()
export class Place extends BaseEntity {
    // Field - allowing GraphQL to query 
    // for the following entity columns
    // PrimaryGeneratedColumn is a primary key column
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number


    @Field()
    @Column()
    title: string


    @Field({
        nullable: true,
        description: "The place description"
    })
    @Column()
    description?: string //optional ?


    @Field({
        nullable: true,
        description: "Place Image URL"
    })
    @Column()
    imageUrl?: string


    @Field({ nullable: true})
    @Column()
    creationDate?: Date
}