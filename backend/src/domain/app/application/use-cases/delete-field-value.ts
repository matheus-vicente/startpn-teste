import { type Either, left, right } from "@/core/either";
import { type FieldValuesRepository } from "../repositories/field-values-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteFieldValueUseCaseRequest {
  id: string;
}

type DeleteFieldValueUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, unknown>
>;

export class DeleteFieldValueUseCase {
  constructor(private readonly fieldValuesRepository: FieldValuesRepository) {}

  async execute({
    id,
  }: DeleteFieldValueUseCaseRequest): Promise<DeleteFieldValueUseCaseResponse> {
    const fieldValue = await this.fieldValuesRepository.findById(id);

    if (!fieldValue) {
      return left(new ResourceNotFoundError());
    }

    await this.fieldValuesRepository.delete(fieldValue);

    return right({});
  }
}
