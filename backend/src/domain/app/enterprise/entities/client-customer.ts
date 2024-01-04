import { Client } from "./client";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ClientCustomerProps {
  name: string;
}

export class ClientCustomer extends Client {
  static create(
    props: ClientCustomerProps,
    id?: UniqueEntityId | undefined,
  ): ClientCustomer {
    return new ClientCustomer(
      {
        ...props,
        type: "CUSTOMER",
      },
      id,
    );
  }
}
