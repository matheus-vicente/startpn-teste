import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  FieldValue,
  type FieldValueProps,
} from "@/domain/app/enterprise/entities/field-value";
import { faker } from "@faker-js/faker";

export function makeFieldValue(
  override: Partial<FieldValueProps>,
  id?: UniqueEntityId,
): FieldValue {
  const fieldValue = FieldValue.create(
    {
      value: faker.lorem.word(),
      idField: new UniqueEntityId(faker.string.uuid()),
      idClient: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  );

  return fieldValue;
}
