import { type UseCaseError } from "@/core/errors/use-case-error";

export class ResourceAlreadyStoredError extends Error implements UseCaseError {
  constructor() {
    super("Resource already stored");
  }
}
