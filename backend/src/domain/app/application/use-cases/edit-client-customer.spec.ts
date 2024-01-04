import { makeClientCustomer } from "test/factories/make-client-customer";
import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { EditClientCustomerUseCase } from "./edit-client-customer";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: EditClientCustomerUseCase;

describe("Edit Customer Client", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new EditClientCustomerUseCase(inMemoryClientsRepository);
  });

  it("should be able to edit a client customer", async () => {
    await inMemoryClientsRepository.create(
      makeClientCustomer(
        { name: "Custom Name" },
        new UniqueEntityId("custom-id"),
      ),
    );

    const result = await sut.execute({
      id: "custom-id",
      name: "Another Name Test",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items[0]).toMatchObject({
      name: "Another Name Test",
    });
  });

  it("should not be able to edit a client customer with wrong id", async () => {
    await inMemoryClientsRepository.create(
      makeClientCustomer(
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

  it("should not be able to edit a client customer if the name was already stored", async () => {
    await inMemoryClientsRepository.create(
      makeClientCustomer(
        { name: "Custom Name 01" },
        new UniqueEntityId("custom-id-01"),
      ),
    );

    await inMemoryClientsRepository.create(
      makeClientCustomer(
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
