import { type Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { type FieldsRepository } from "../repositories/fields-repository";
import { type FieldShipper } from "../../enterprise/entities/field-shipper";

interface EditFieldShipperUseCaseRequest {
  id: string;
  name: string;
}

type EditFieldShipperUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyStoredError,
  { field: FieldShipper }
>;

export class EditFieldShipperUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    id,
    name,
  }: EditFieldShipperUseCaseRequest): Promise<EditFieldShipperUseCaseResponse> {
    const field = await this.fieldsRepository.findById(id);

    if (!field) {
      return left(new ResourceNotFoundError());
    }

    const fieldWithSameName = await this.fieldsRepository.findByName(name);

    if (fieldWithSameName && fieldWithSameName.type === "SHIPPER") {
      return left(new ResourceAlreadyStoredError());
    }

    field.name = name;

    return right({ field });
  }
}
