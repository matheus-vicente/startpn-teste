import { Entity } from "@/core/entities/entity";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";
import { type Optional } from "@/core/types/optional";

export interface FieldValueProps {
  value: string;
  idField: UniqueEntityId;
  idClient: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class FieldValue extends Entity<FieldValueProps> {
  static create(
    props: Optional<FieldValueProps, "createdAt">,
    id?: UniqueEntityId,
  ): FieldValue {
    const fieldValue = new FieldValue(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return fieldValue;
  }

  get value(): string {
    return this.props.value;
  }

  get idField(): UniqueEntityId {
    return this.props.idField;
  }

  get idClient(): UniqueEntityId {
    return this.props.idClient;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  set value(value: string) {
    this.props.value = value;
    this.touch();
  }
}
