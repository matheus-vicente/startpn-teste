import { type PaginationParams } from "@/core/repositories/pagination-params";
import { type Client } from "../../enterprise/entities/client";
import { type ClientType } from "../types/client-type";

export interface FindOptionsProp {
  page: PaginationParams;
}

export interface ClientsRepository {
  save: (client: Client) => Promise<void>;
  create: (client: Client) => Promise<void>;
  delete: (client: Client) => Promise<void>;
  find: (params: PaginationParams) => Promise<Client[]>;
  findById: (id: string) => Promise<Client | undefined>;
  findByName: (name: string) => Promise<Client | undefined>;
  findByType: (type: ClientType, params: PaginationParams) => Promise<Client[]>;
}
