import { right, type Either } from "@/core/either";
import { type FieldsRepository } from "../repositories/fields-repository";
import { type Field } from "../../enterprise/entities/field";
import { type ClientType } from "../types/client-type";

interface FetchFieldsByTypeUseCaseRequest {
  type: ClientType;
  page: number;
}

type FetchFieldsByTypeUseCaseResponse = Either<null, { fields: Field[] }>;

export class FetchFieldsByTypeUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    type,
    page,
  }: FetchFieldsByTypeUseCaseRequest): Promise<FetchFieldsByTypeUseCaseResponse> {
    const fields = await this.fieldsRepository.findByType(type, { page });

    return right({ fields });
  }
}
