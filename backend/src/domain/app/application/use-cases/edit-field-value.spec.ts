import { makeFieldValue } from "test/factories/make-field-value";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { EditFieldValueUseCase } from "./edit-field-value";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let sut: EditFieldValueUseCase;

describe("Edit Field Value", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();

    sut = new EditFieldValueUseCase(inMemoryFieldValuesRepository);
  });

  it("should be able to edit a field value", async () => {
    const fieldValue = makeFieldValue(
      {
        value: "Custom value",
      },
      new UniqueEntityId("custom-field-value-id"),
    );
    inMemoryFieldValuesRepository.create(fieldValue);

    const result = await sut.execute({
      id: fieldValue.id.toString(),
      value: "New value",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldValuesRepository.items[0].value).toEqual("New value");
  });

  it("should not be able to edit a field value non existent", async () => {
    const fieldValue = makeFieldValue(
      {
        value: "Custom value",
      },
      new UniqueEntityId("custom-field-value-id"),
    );
    inMemoryFieldValuesRepository.create(fieldValue);

    const result = await sut.execute({
      id: "another-field-value-id",
      value: "New value",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).instanceOf(ResourceNotFoundError);
  });
});
