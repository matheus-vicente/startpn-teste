import { Field } from "./field";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface FieldCustomerProps {
  name: string;
}

export class FieldCustomer extends Field {
  static create(
    props: FieldCustomerProps,
    id?: UniqueEntityId | undefined,
  ): FieldCustomer {
    return new FieldCustomer(
      {
        ...props,
        type: "CUSTOMER",
      },
      id,
    );
  }
}
