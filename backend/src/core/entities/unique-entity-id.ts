import { randomUUID } from "node:crypto";

/**
 * Creates a unique identifier using node:crypto
 */
export class UniqueEntityId {
  private value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  /**
   * Returns the value of UniqueEntityId
   * @returns string
   */
  toString(): string {
    return this.value;
  }
}
