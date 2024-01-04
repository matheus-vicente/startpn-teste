import { faker } from "@faker-js/faker";

import { type UniqueEntityId } from "@/core/entities/unique-entity-id";
import { type Client } from "@/domain/app/enterprise/entities/client";
import {
  ClientShipper,
  type ClientShipperProps,
} from "@/domain/app/enterprise/entities/client-shipper";

export function makeClientShipper(
  override: Partial<ClientShipperProps>,
  id?: UniqueEntityId,
): Client {
  const client = ClientShipper.create(
    {
      name: faker.person.fullName(),
      ...override,
    },
    id,
  );

  return client;
}
