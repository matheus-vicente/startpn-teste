import { CreateClientShipperUseCase } from "./create-client-shipper";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { makeClientShipper } from "test/factories/make-client-shipper";
import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: CreateClientShipperUseCase;

describe("Create Customer Shipper", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new CreateClientShipperUseCase(inMemoryClientsRepository);
  });

  it("should be able to create a customer with type shipper", async () => {
    const result = await sut.execute({ name: "Name Test" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items[0].type).toEqual("SHIPPER");
  });

  it("should not be able to create a customer with type shipper if name is already stored", async () => {
    await inMemoryClientsRepository.create(
      makeClientShipper({ name: "Name test" }),
    );

    const result = await sut.execute({ name: "Name test" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
