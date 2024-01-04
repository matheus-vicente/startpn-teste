import { CreateFieldShipperUseCase } from "./create-field-shipper";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { makeFieldShipper } from "test/factories/make-field-shipper";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";
import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: CreateFieldShipperUseCase;

describe("Create Field Shipper", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new CreateFieldShipperUseCase(inMemoryFieldsRepository);
  });

  it("should be able to create a field with type shipper", async () => {
    const result = await sut.execute({ name: "Name Test" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsRepository.items[0].type).toEqual("SHIPPER");
  });

  it("should not be able to create a field with type shipper if name is already stored", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldShipper({ name: "Name test" }),
    );

    const result = await sut.execute({ name: "Name test" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
