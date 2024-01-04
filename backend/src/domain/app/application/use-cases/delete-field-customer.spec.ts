import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";
import { DeleteFieldCustomerUseCase } from "./delete-field-customer";
import { makeFieldCustomer } from "test/factories/make-field-customer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: DeleteFieldCustomerUseCase;

describe("Delete Field Client", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new DeleteFieldCustomerUseCase(inMemoryFieldsRepository);
  });

  it("should be able to delete a field client", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldCustomer({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryFieldsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "custom-id" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a field client with wrong id", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldCustomer({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryFieldsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "wrong-id" });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryFieldsRepository.items).toHaveLength(1);
  });
});
