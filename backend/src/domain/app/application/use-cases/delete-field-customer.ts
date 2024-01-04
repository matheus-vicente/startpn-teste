import { type Either, left, right } from "@/core/either";
import { type FieldsRepository } from "../repositories/fields-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteFieldCustomerUseCaseRequest {
  id: string;
}

type DeleteFieldCustomerUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, unknown>
>;

export class DeleteFieldCustomerUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    id,
  }: DeleteFieldCustomerUseCaseRequest): Promise<DeleteFieldCustomerUseCaseResponse> {
    const field = await this.fieldsRepository.findById(id);

    if (!field) {
      return left(new ResourceNotFoundError());
    }

    await this.fieldsRepository.delete(field);

    return right({});
  }
}
