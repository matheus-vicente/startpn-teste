import { type UseCaseError } from "@/core/errors/use-case-error";

export class DifferentTypesError extends Error implements UseCaseError {
  constructor() {
    super("The type between entities must be equal");
  }
}
