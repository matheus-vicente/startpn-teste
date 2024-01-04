import { type PaginationParams } from "@/core/repositories/pagination-params";
import { type Field } from "../../enterprise/entities/field";
import { type CustomerType } from "../types/client-type";

export interface FindOptionsProp {
  page: PaginationParams;
}

export interface FieldsRepository {
  save: (field: Field) => Promise<void>;
  create: (field: Field) => Promise<void>;
  delete: (field: Field) => Promise<void>;
  find: (params: PaginationParams) => Promise<Field[]>;
  findById: (id: string) => Promise<Field | undefined>;
  findByName: (name: string) => Promise<Field | undefined>;
  findByType: (
    type: CustomerType,
    params: PaginationParams,
  ) => Promise<Field[]>;
}
