import { faker } from "@faker-js/faker";

import { type UniqueEntityId } from "@/core/entities/unique-entity-id";
import { type Field } from "@/domain/app/enterprise/entities/field";
import {
  FieldShipper,
  type FieldShipperProps,
} from "@/domain/app/enterprise/entities/field-shipper";

export function makeFieldShipper(
  override: Partial<FieldShipperProps>,
  id?: UniqueEntityId,
): Field {
  const field = FieldShipper.create(
    {
      name: faker.person.fullName(),
      ...override,
    },
    id,
  );

  return field;
}
