import { type Either, left, right } from "@/core/either";
import { type FieldValuesRepository } from "../repositories/field-values-repository";
import { type FieldValue } from "../../enterprise/entities/field-value";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditFieldValueUseCaseRequest {
  id: string;
  value: string;
}

type EditFieldValueUseCaseResponse = Either<
  ResourceNotFoundError,
  { fieldValue: FieldValue }
>;

export class EditFieldValueUseCase {
  constructor(private readonly fieldValuesRepository: FieldValuesRepository) {}

  async execute({
    id,
    value,
  }: EditFieldValueUseCaseRequest): Promise<EditFieldValueUseCaseResponse> {
    const fieldValue = await this.fieldValuesRepository.findById(id);

    if (!fieldValue) {
      return left(new ResourceNotFoundError());
    }

    fieldValue.value = value;

    return right({ fieldValue });
  }
}
