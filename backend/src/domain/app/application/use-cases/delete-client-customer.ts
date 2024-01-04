import { type Either, left, right } from "@/core/either";
import { type ClientsRepository } from "../repositories/clients-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface DeleteClientCustomerUseCaseRequest {
  id: string;
}

type DeleteClientCustomerUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, unknown>
>;

export class DeleteClientCustomerUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    id,
  }: DeleteClientCustomerUseCaseRequest): Promise<DeleteClientCustomerUseCaseResponse> {
    const customer = await this.clientsRepository.findById(id);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }

    await this.clientsRepository.delete(customer);

    return right({});
  }
}
