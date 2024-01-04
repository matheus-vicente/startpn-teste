import { faker } from "@faker-js/faker";

import { type UniqueEntityId } from "@/core/entities/unique-entity-id";
import { type Client } from "@/domain/app/enterprise/entities/client";
import {
  ClientCustomer,
  type ClientCustomerProps,
} from "@/domain/app/enterprise/entities/client-customer";

export function makeClientCustomer(
  override: Partial<ClientCustomerProps>,
  id?: UniqueEntityId,
): Client {
  const client = ClientCustomer.create(
    {
      name: faker.person.fullName(),
      ...override,
    },
    id,
  );

  return client;
}
