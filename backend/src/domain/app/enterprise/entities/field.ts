import { Entity } from "@/core/entities/entity";
import { type Optional } from "@/core/types/optional";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";
import { type ClientType } from "../../application/types/client-type";

interface FieldProps {
  name: string;
  type: ClientType;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class Field extends Entity<FieldProps> {
  protected constructor(
    props: Optional<FieldProps, "createdAt">,
    id?: UniqueEntityId,
  ) {
    super(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );
  }

  get name(): string {
    return this.props.name;
  }

  get type(): ClientType {
    return this.props.type;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set type(type: ClientType) {
    this.props.type = type;
    this.touch();
  }
}
