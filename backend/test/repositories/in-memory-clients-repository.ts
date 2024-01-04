import { type PaginationParams } from "@/core/repositories/pagination-params";
import { type Client } from "@/domain/app/enterprise/entities/client";
import { type ClientType } from "@/domain/app/application/types/client-type";
import { type ClientsRepository } from "@/domain/app/application/repositories/clients-repository";
import { type FieldValuesRepository } from "@/domain/app/application/repositories/field-values-repository";

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = [];

  constructor(private readonly fieldValuesRepository: FieldValuesRepository) {}

  async create(client: Client): Promise<void> {
    this.items.push(client);
  }

  async delete(client: Client): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === client.id);

    this.items.splice(itemIndex, 1);

    this.fieldValuesRepository.deleteManyById(client.id.toString());
  }

  async save(client: Client): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === client.id);

    this.items[itemIndex] = client;
  }

  async find({ page }: PaginationParams): Promise<Client[]> {
    const clients = this.items.slice((page - 1) * 20, page * 20);

    return clients;
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = this.items.find((item) => item.id.toString() === id);

    return client;
  }

  async findByName(name: string): Promise<Client | undefined> {
    const client = this.items.find((item) => item.name === name);

    return client;
  }

  async findByType(
    type: ClientType,
    { page }: PaginationParams,
  ): Promise<Client[]> {
    const clients = this.items
      .filter((item) => item.type === type)
      .slice((page - 1) * 20, page * 20);

    return clients;
  }
}
