import { type Either, left, right } from "@/core/either";
import { type FieldsRepository } from "../repositories/fields-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteFieldShipperUseCaseRequest {
  id: string;
}

type DeleteFieldShipperUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, unknown>
>;

export class DeleteFieldShipperUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    id,
  }: DeleteFieldShipperUseCaseRequest): Promise<DeleteFieldShipperUseCaseResponse> {
    const field = await this.fieldsRepository.findById(id);

    if (!field) {
      return left(new ResourceNotFoundError());
    }

    await this.fieldsRepository.delete(field);

    return right({});
  }
}
