import { right, type Either } from "@/core/either";
import { type ClientsRepository } from "../repositories/clients-repository";
import { type Client } from "../../enterprise/entities/client";

interface FetchClientsUseCaseRequest {
  page: number;
}

type FetchClientsUseCaseResponse = Either<null, { clients: Client[] }>;

export class FetchClientsUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    page,
  }: FetchClientsUseCaseRequest): Promise<FetchClientsUseCaseResponse> {
    const clients = await this.clientsRepository.find({ page });

    return right({ clients });
  }
}
