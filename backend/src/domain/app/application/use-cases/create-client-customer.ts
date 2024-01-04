import { left, type Either, right } from "@/core/either";
import { type ClientsRepository } from "../repositories/clients-repository";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { ClientCustomer } from "../../enterprise/entities/client-customer";

interface CreateClientCustomerUseCaseRequest {
  name: string;
}

type CreateClientCustomerUseCaseResponse = Either<
  ResourceAlreadyStoredError,
  { customer: ClientCustomer }
>;

export class CreateClientCustomerUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    name,
  }: CreateClientCustomerUseCaseRequest): Promise<CreateClientCustomerUseCaseResponse> {
    const nameAlreadyStored = await this.clientsRepository.findByName(name);

    if (nameAlreadyStored && nameAlreadyStored.type === "CUSTOMER") {
      return left(new ResourceAlreadyStoredError());
    }

    const customer = ClientCustomer.create({
      name,
    });

    await this.clientsRepository.create(customer);

    return right({ customer });
  }
}
