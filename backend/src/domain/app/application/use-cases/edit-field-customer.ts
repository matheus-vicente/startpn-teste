import { type Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { type FieldsRepository } from "../repositories/fields-repository";
import { type FieldCustomer } from "../../enterprise/entities/field-customer";

interface EditFieldCustomerUseCaseRequest {
  id: string;
  name: string;
}

type EditFieldCustomerUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyStoredError,
  { field: FieldCustomer }
>;

export class EditFieldCustomerUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    id,
    name,
  }: EditFieldCustomerUseCaseRequest): Promise<EditFieldCustomerUseCaseResponse> {
    const field = await this.fieldsRepository.findById(id);

    if (!field) {
      return left(new ResourceNotFoundError());
    }

    const fieldWithSameName = await this.fieldsRepository.findByName(name);

    if (fieldWithSameName && fieldWithSameName.type === "CUSTOMER") {
      return left(new ResourceAlreadyStoredError());
    }

    field.name = name;

    return right({ field });
  }
}
