import { Client } from "./client";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface ClientShipperProps {
  name: string;
}

export class ClientShipper extends Client {
  static create(
    props: ClientShipperProps,
    id?: UniqueEntityId | undefined,
  ): ClientShipper {
    return new ClientShipper(
      {
        ...props,
        type: "SHIPPER",
      },
      id,
    );
  }
}
