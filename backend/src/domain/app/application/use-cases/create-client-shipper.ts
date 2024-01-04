import { left, type Either, right } from "@/core/either";
import { type ClientsRepository } from "../repositories/clients-repository";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { ClientShipper } from "../../enterprise/entities/client-shipper";

interface CreateClientShipperUseCaseRequest {
  name: string;
}

type CreateClientShipperUseCaseResponse = Either<
  ResourceAlreadyStoredError,
  { customer: ClientShipper }
>;

export class CreateClientShipperUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    name,
  }: CreateClientShipperUseCaseRequest): Promise<CreateClientShipperUseCaseResponse> {
    const nameAlreadyStored = await this.clientsRepository.findByName(name);

    if (nameAlreadyStored && nameAlreadyStored.type === "SHIPPER") {
      return left(new ResourceAlreadyStoredError());
    }

    const customer = ClientShipper.create({
      name,
    });

    await this.clientsRepository.create(customer);

    return right({ customer });
  }
}
