import { type PaginationParams } from "@/core/repositories/pagination-params";
import { type Field } from "@/domain/app/enterprise/entities/field";
import { type ClientType } from "@/domain/app/application/types/client-type";
import { type FieldsRepository } from "@/domain/app/application/repositories/fields-repository";
import { type FieldValuesRepository } from "@/domain/app/application/repositories/field-values-repository";

export class InMemoryFieldsRepository implements FieldsRepository {
  public items: Field[] = [];

  constructor(private readonly fieldValuesRepository: FieldValuesRepository) {}

  async create(field: Field): Promise<void> {
    this.items.push(field);
  }

  async delete(field: Field): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === field.id);

    this.items.splice(itemIndex, 1);

    this.fieldValuesRepository.deleteManyById(field.id.toString());
  }

  async save(field: Field): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === field.id);

    this.items[itemIndex] = field;
  }

  async find({ page }: PaginationParams): Promise<Field[]> {
    const fields = this.items.slice((page - 1) * 20, page * 20);

    return fields;
  }

  async findById(id: string): Promise<Field | undefined> {
    const field = this.items.find((item) => item.id.toString() === id);

    return field;
  }

  async findByName(name: string): Promise<Field | undefined> {
    const field = this.items.find((item) => item.name === name);

    return field;
  }

  async findByType(
    type: ClientType,
    { page }: PaginationParams,
  ): Promise<Field[]> {
    const fields = this.items
      .filter((item) => item.type === type)
      .slice((page - 1) * 20, page * 20);

    return fields;
  }
}
