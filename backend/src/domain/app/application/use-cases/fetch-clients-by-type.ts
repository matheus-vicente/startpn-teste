import { right, type Either } from "@/core/either";
import { type ClientsRepository } from "../repositories/clients-repository";
import { type Client } from "../../enterprise/entities/client";
import { type ClientType } from "../types/client-type";

interface FetchClientsByTypeUseCaseRequest {
  type: ClientType;
  page: number;
}

type FetchClientsByTypeUseCaseResponse = Either<null, { clients: Client[] }>;

export class FetchClientsByTypeUseCase {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async execute({
    type,
    page,
  }: FetchClientsByTypeUseCaseRequest): Promise<FetchClientsByTypeUseCaseResponse> {
    const clients = await this.clientsRepository.findByType(type, { page });

    return right({ clients });
  }
}
