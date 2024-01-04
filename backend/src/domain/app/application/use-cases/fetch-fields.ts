import { right, type Either } from "@/core/either";
import { type FieldsRepository } from "../repositories/fields-repository";
import { type Field } from "../../enterprise/entities/field";

interface FetchFieldsUseCaseRequest {
  page: number;
}

type FetchFieldsUseCaseResponse = Either<null, { fields: Field[] }>;

export class FetchFieldsUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    page,
  }: FetchFieldsUseCaseRequest): Promise<FetchFieldsUseCaseResponse> {
    const fields = await this.fieldsRepository.find({ page });

    return right({ fields });
  }
}
