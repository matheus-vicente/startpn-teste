import { CreateFieldCustomerUseCase } from "./create-field-customer";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { makeFieldCustomer } from "test/factories/make-field-customer";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";
import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: CreateFieldCustomerUseCase;

describe("Create Field Client", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new CreateFieldCustomerUseCase(inMemoryFieldsRepository);
  });

  it("should be able to create a field with type client", async () => {
    const result = await sut.execute({ name: "Name Test" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsRepository.items[0].type).toEqual("CUSTOMER");
  });

  it("should not be able to create a field with type client if name is already stored", async () => {
    await inMemoryFieldsRepository.create(
      makeFieldCustomer({ name: "Name test" }),
    );

    const result = await sut.execute({ name: "Name test" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
