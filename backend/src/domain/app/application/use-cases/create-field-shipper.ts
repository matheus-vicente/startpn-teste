import { left, type Either, right } from "@/core/either";
import { type FieldsRepository } from "../repositories/fields-repository";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { FieldShipper } from "../../enterprise/entities/field-shipper";

interface CreateFieldShipperUseCaseRequest {
  name: string;
}

type CreateFieldShipperUseCaseResponse = Either<
  ResourceAlreadyStoredError,
  { field: FieldShipper }
>;

export class CreateFieldShipperUseCase {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async execute({
    name,
  }: CreateFieldShipperUseCaseRequest): Promise<CreateFieldShipperUseCaseResponse> {
    const nameAlreadyStored = await this.fieldsRepository.findByName(name);

    if (nameAlreadyStored && nameAlreadyStored.type === "SHIPPER") {
      return left(new ResourceAlreadyStoredError());
    }

    const field = FieldShipper.create({
      name,
    });

    await this.fieldsRepository.create(field);

    return right({ field });
  }
}
