import { type Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { type ClientsRepository } from "../repositories/clients-repository";
import { type ClientCustomer } from "../../enterprise/entities/client-customer";

interface EditClientCustomerUseCaseRequest {
  id: string;
  name: string;
}

type EditClientCustomerUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyStoredError,
  { customer: ClientCustomer }
>;

export class EditClientCustomerUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    id,
    name,
  }: EditClientCustomerUseCaseRequest): Promise<EditClientCustomerUseCaseResponse> {
    const customer = await this.clientsRepository.findById(id);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }

    const customerWithSameName = await this.clientsRepository.findByName(name);

    if (customerWithSameName && customerWithSameName.type === "CUSTOMER") {
      return left(new ResourceAlreadyStoredError());
    }

    customer.name = name;

    return right({ customer });
  }
}
