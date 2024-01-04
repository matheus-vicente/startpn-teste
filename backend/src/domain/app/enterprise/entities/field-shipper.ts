import { Field } from "./field";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface FieldShipperProps {
  name: string;
}

export class FieldShipper extends Field {
  static create(
    props: FieldShipperProps,
    id?: UniqueEntityId | undefined,
  ): FieldShipper {
    return new FieldShipper(
      {
        ...props,
        type: "SHIPPER",
      },
      id,
    );
  }
}
