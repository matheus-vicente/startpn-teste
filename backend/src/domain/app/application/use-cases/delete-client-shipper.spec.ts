import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { DeleteClientShipperUseCase } from "./delete-client-shipper";
import { makeClientShipper } from "test/factories/make-client-shipper";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: DeleteClientShipperUseCase;

describe("Delete Client Shipper", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new DeleteClientShipperUseCase(inMemoryClientsRepository);
  });

  it("should be able to delete a client shipper", async () => {
    await inMemoryClientsRepository.create(
      makeClientShipper({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryClientsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "custom-id" });

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a client shipper with wrong id", async () => {
    await inMemoryClientsRepository.create(
      makeClientShipper({}, new UniqueEntityId("custom-id")),
    );

    expect(inMemoryClientsRepository.items).toHaveLength(1);

    const result = await sut.execute({ id: "wrong-id" });

    expect(result.isLeft()).toBe(true);
    expect(inMemoryClientsRepository.items).toHaveLength(1);
  });
});
