import { faker } from "@faker-js/faker";

import { type UniqueEntityId } from "@/core/entities/unique-entity-id";
import { type Field } from "@/domain/app/enterprise/entities/field";
import {
  FieldCustomer,
  type FieldCustomerProps,
} from "@/domain/app/enterprise/entities/field-customer";

export function makeFieldCustomer(
  override: Partial<FieldCustomerProps>,
  id?: UniqueEntityId,
): Field {
  const field = FieldCustomer.create(
    {
      name: faker.person.fullName(),
      ...override,
    },
    id,
  );

  return field;
}
