import { type Either, left, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { DifferentTypesError } from "./errors/different-types-error";
import { type FieldsRepository } from "../repositories/fields-repository";
import { type ClientsRepository } from "../repositories/clients-repository";
import { type FieldValuesRepository } from "../repositories/field-values-repository";
import { FieldValue } from "../../enterprise/entities/field-value";

export interface CreateFieldValueUseCaseRequest {
  value: string;
  idField: string;
  idClient: string;
}

export type CreateFieldValueUseCaseResponse = Either<
  ResourceNotFoundError | DifferentTypesError,
  { fieldValue: FieldValue }
>;

export class CreateFieldValueUseCase {
  constructor(
    private readonly fieldValuesRepository: FieldValuesRepository,
    private readonly fieldsRepository: FieldsRepository,
    private readonly clientsRepository: ClientsRepository,
  ) {}

  async execute({
    value,
    idField,
    idClient,
  }: CreateFieldValueUseCaseRequest): Promise<CreateFieldValueUseCaseResponse> {
    const fieldExists = await this.fieldsRepository.findById(idField);

    if (!fieldExists) {
      return left(new ResourceNotFoundError());
    }

    const customerExists = await this.clientsRepository.findById(idClient);

    if (!customerExists) {
      return left(new ResourceNotFoundError());
    }

    if (fieldExists.type !== customerExists.type) {
      return left(new DifferentTypesError());
    }

    const fieldValue = FieldValue.create({
      value,
      idField: new UniqueEntityId(idField),
      idClient: new UniqueEntityId(idClient),
    });

    await this.fieldValuesRepository.create(fieldValue);

    return right({ fieldValue });
  }
}
