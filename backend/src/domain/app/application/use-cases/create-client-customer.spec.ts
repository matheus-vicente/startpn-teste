import { CreateClientCustomerUseCase } from "./create-client-customer";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { makeClientCustomer } from "test/factories/make-client-customer";
import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: CreateClientCustomerUseCase;

describe("Create Client Customer", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new CreateClientCustomerUseCase(inMemoryClientsRepository);
  });

  it("should be able to create a customer with type customer", async () => {
    const result = await sut.execute({ name: "Name Test" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items[0].type).toEqual("CUSTOMER");
  });

  it("should not be able to create a customer with type customer if name is already stored", async () => {
    await inMemoryClientsRepository.create(
      makeClientCustomer({ name: "Name test" }),
    );

    const result = await sut.execute({ name: "Name test" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
