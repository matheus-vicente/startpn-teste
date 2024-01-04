import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";
import { DeleteFieldShipperUseCase } from "./delete-field-shipper";
import { makeFieldShipper } from "test/factories/make-field-shipper";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: DeleteFieldShipperUseCase;

describe("Delete Field Shipper", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new DeleteFieldShipperUseCase(inMemoryFieldsRepository);
  });

  it("should be able to delete a field shipper", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldShipper({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryFieldsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "custom-id" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a field shipper with wrong id", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldShipper({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryFieldsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "wrong-id" });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryFieldsRepository.items).toHaveLength(1);
  });
});
