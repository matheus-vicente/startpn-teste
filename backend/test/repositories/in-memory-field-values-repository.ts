import { type PaginationParams } from "@/core/repositories/pagination-params";
import { type FieldValue } from "@/domain/app/enterprise/entities/field-value";
import { type FieldValuesRepository } from "@/domain/app/application/repositories/field-values-repository";

export class InMemoryFieldValuesRepository implements FieldValuesRepository {
  public items: FieldValue[] = [];

  async create(fieldValue: FieldValue): Promise<void> {
    this.items.push(fieldValue);
  }

  async save(fieldValue: FieldValue): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === fieldValue.id);

    this.items[itemIndex] = fieldValue;
  }

  async delete(fieldValue: FieldValue): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === fieldValue.id);

    this.items.splice(itemIndex, 1);
  }

  async findById(id: string): Promise<FieldValue | undefined> {
    const fieldValue = this.items.find((item) => item.id.toString() === id);

    return fieldValue;
  }

  async find({ page }: PaginationParams): Promise<FieldValue[]> {
    const fieldValues = this.items.slice((page - 1) * 20, page * 20);

    return fieldValues;
  }

  async deleteManyById(recipientId: string): Promise<void> {
    const fieldValueClient = this.items.filter(
      (item) => item.idClient.toString() !== recipientId,
    );

    const fieldValueField = this.items.filter(
      (item) => item.idClient.toString() !== recipientId,
    );

    this.items = fieldValueClient.concat(fieldValueField);
  }
}
