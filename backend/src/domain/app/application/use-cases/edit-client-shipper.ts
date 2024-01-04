import { type Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { type ClientsRepository } from "../repositories/clients-repository";
import { type ClientShipper } from "../../enterprise/entities/client-shipper";

interface EditClientShipperUseCaseRequest {
  id: string;
  name: string;
}

type EditClientShipperUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyStoredError,
  { customer: ClientShipper }
>;

export class EditClientShipperUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    id,
    name,
  }: EditClientShipperUseCaseRequest): Promise<EditClientShipperUseCaseResponse> {
    const customer = await this.clientsRepository.findById(id);

    if (!customer) {
      return left(new ResourceNotFoundError());
    }

    const customerWithSameName = await this.clientsRepository.findByName(name);

    if (customerWithSameName && customerWithSameName.type === "SHIPPER") {
      return left(new ResourceAlreadyStoredError());
    }

    customer.name = name;

    return right({ customer });
  }
}
