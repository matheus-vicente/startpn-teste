import { Entity } from "@/core/entities/entity";
import { type Phone } from "./value-objects/phone";
import { type Optional } from "@/core/types/optional";
import { type UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface UserProps {
  name: string;
  phone?: Phone;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  static create(
    props: Optional<UserProps, "createdAt" | "phone">,
    id?: UniqueEntityId,
  ): User {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return user;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): Phone | undefined {
    return this.props.phone;
  }

  get password(): string {
    return this.props.password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set phone(phone: Phone | undefined) {
    this.props.phone = phone;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }
}
