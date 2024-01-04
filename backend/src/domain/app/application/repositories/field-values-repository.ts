import { type PaginationParams } from "@/core/repositories/pagination-params";
import { type FieldValue } from "../../enterprise/entities/field-value";

export interface FieldValuesRepository {
  save: (field: FieldValue) => Promise<void>;
  create: (field: FieldValue) => Promise<void>;
  delete: (field: FieldValue) => Promise<void>;
  findById: (id: string) => Promise<FieldValue | undefined>;
  find: (params: PaginationParams) => Promise<FieldValue[]>;
  deleteManyById: (recipientId: string) => Promise<void>;
}
