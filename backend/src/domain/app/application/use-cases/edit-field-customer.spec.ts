import { makeFieldCustomer } from "test/factories/make-field-customer";
import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { EditFieldCustomerUseCase } from "./edit-field-customer";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: EditFieldCustomerUseCase;

describe("Edit Field Client", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new EditFieldCustomerUseCase(inMemoryFieldsRepository);
  });

  it("should be able to edit a field client", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldCustomer(
        { name: "Custom Name" },
        new UniqueEntityId("custom-id"),
      ),
    );

    const result = await sut.execute({
      id: "custom-id",
      name: "Another Name Test",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsRepository.items[0]).toMatchObject({
      name: "Another Name Test",
    });
  });

  it("should not be able to edit a field client with wrong id", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldCustomer(
        { name: "Custom Name" },
        new UniqueEntityId("custom-id"),
      ),
    );

    const result = await sut.execute({
      id: "wrong-id",
      name: "Another Name Test",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to edit a field client if the name was already stored", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldCustomer(
        { name: "Custom Name 01" },
        new UniqueEntityId("custom-id-01"),
      ),
    );

    await inMemoryFieldsRepository.create(
      makeFieldCustomer(
        { name: "Custom Name 02" },
        new UniqueEntityId("custom-id-02"),
      ),
    );

    const result = await sut.execute({
      id: "custom-id-01",
      name: "Custom Name 02",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
