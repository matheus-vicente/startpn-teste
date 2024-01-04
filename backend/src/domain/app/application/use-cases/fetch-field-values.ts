import { right, type Either } from "@/core/either";
import { type FieldValuesRepository } from "../repositories/field-values-repository";
import { type FieldValue } from "../../enterprise/entities/field-value";

interface FetchFieldValuesUseCaseRequest {
  page: number;
}

type FetchFieldValuesUseCaseResponse = Either<
  null,
  { fieldValues: FieldValue[] }
>;

export class FetchFieldValuesUseCase {
  constructor(private readonly fieldvaluesRepository: FieldValuesRepository) {}

  async execute({
    page,
  }: FetchFieldValuesUseCaseRequest): Promise<FetchFieldValuesUseCaseResponse> {
    const fieldValues = await this.fieldvaluesRepository.find({ page });

    return right({ fieldValues });
  }
}
