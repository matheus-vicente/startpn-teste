import { type Optional } from "@/core/types/optional";
import { Entity } from "@/core/entities/entity";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";

interface CustomerProps {
  name: string;
  type: "CLIENT" | "SHIPPER";
  createdAt: Date;
  updatedAt?: Date;
}

export class Customer extends Entity<CustomerProps> {
  static create(
    props: Optional<CustomerProps, "createdAt">,
    id?: UniqueEntityId,
  ): Customer {
    return new Customer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );
  }
}
