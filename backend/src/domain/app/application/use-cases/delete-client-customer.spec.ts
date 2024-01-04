import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { DeleteClientCustomerUseCase } from "./delete-client-customer";
import { makeClientCustomer } from "test/factories/make-client-customer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: DeleteClientCustomerUseCase;

describe("Delete Customer Client", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new DeleteClientCustomerUseCase(inMemoryClientsRepository);
  });

  it("should be able to delete a customer client", async () => {
    await inMemoryClientsRepository.create(
      makeClientCustomer({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryClientsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "custom-id" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a customer client with wrong id", async () => {
    await inMemoryClientsRepository.create(
      makeClientCustomer({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryClientsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "wrong-id" });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryClientsRepository.items).toHaveLength(1);
  });
});
