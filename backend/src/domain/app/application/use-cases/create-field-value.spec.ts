import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";
import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";
import { CreateFieldValueUseCase } from "./create-field-value";
import { makeClientCustomer } from "test/factories/make-client-customer";
import { makeFieldCustomer } from "test/factories/make-field-customer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeClientShipper } from "test/factories/make-client-shipper";
import { DifferentTypesError } from "./errors/different-types-error";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: CreateFieldValueUseCase;

describe("Create Field Shipper", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new CreateFieldValueUseCase(
      inMemoryFieldValuesRepository,
      inMemoryFieldsRepository,
      inMemoryClientsRepository,
    );
  });

  it("should be able to create a field value", async () => {
    const field = makeFieldCustomer({}, new UniqueEntityId("custom-field-id"));
    inMemoryFieldsRepository.create(field);

    const customer = makeClientCustomer(
      {},
      new UniqueEntityId("custom-customer-id"),
    );
    inMemoryClientsRepository.create(customer);

    const result = await sut.execute({
      value: "Test value",
      idField: field.id.toString(),
      idClient: customer.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldValuesRepository.items[0].value).toEqual("Test value");
  });

  it("should not be able to create a field value with non existent entities", async () => {
    const field = makeFieldCustomer({}, new UniqueEntityId("custom-field-id"));
    inMemoryFieldsRepository.create(field);

    const result = await sut.execute({
      value: "Test value",
      idField: field.id.toString(),
      idClient: "custom-customer-id",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to create a field value with different types", async () => {
    const field = makeFieldCustomer({}, new UniqueEntityId("custom-field-id"));
    inMemoryFieldsRepository.create(field);

    const customer = makeClientShipper(
      {},
      new UniqueEntityId("custom-customer-id"),
    );
    inMemoryClientsRepository.create(customer);

    const result = await sut.execute({
      value: "Test value",
      idField: field.id.toString(),
      idClient: customer.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DifferentTypesError);
  });
});
