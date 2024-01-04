import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";
import { DeleteFieldValueUseCase } from "./delete-field-value";
import { makeFieldValue } from "test/factories/make-field-value";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let sut: DeleteFieldValueUseCase;

describe("Delete Field Value", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();

    sut = new DeleteFieldValueUseCase(inMemoryFieldValuesRepository);
  });

  it("should be able to delete a field value", async () => {
    const fieldValue = makeFieldValue(
      {},
      new UniqueEntityId("custom-field-value-id"),
    );
    inMemoryFieldValuesRepository.create(fieldValue);

    expect(inMemoryFieldValuesRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: fieldValue.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldValuesRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a non existent field value", async () => {
    const fieldValue = makeFieldValue(
      {},
      new UniqueEntityId("custom-field-value-id"),
    );
    inMemoryFieldValuesRepository.create(fieldValue);

    expect(inMemoryFieldValuesRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "wrong-field-value-id" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
