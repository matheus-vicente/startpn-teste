import { left, type Either, right } from "@/core/either";
import { type FieldsRepository } from "../repositories/fields-repository";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { FieldCustomer } from "../../enterprise/entities/field-customer";

interface CreateFieldCustomerUseCaseRequest {
  name: string;
}

type CreateFieldCustomerUseCaseResponse = Either<
  ResourceAlreadyStoredError,
  { field: FieldCustomer }
>;

export class CreateFieldCustomerUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    name,
  }: CreateFieldCustomerUseCaseRequest): Promise<CreateFieldCustomerUseCaseResponse> {
    const nameAlreadyStored = await this.fieldsRepository.findByName(name);

    if (nameAlreadyStored && nameAlreadyStored.type === "CUSTOMER") {
      return left(new ResourceAlreadyStoredError());
    }

    const field = FieldCustomer.create({
      name,
    });

    await this.fieldsRepository.create(field);

    return right({ field });
  }
}
