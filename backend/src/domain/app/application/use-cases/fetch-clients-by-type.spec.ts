import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { FetchClientsByTypeUseCase } from "./fetch-clients-by-type";
import { makeClientCustomer } from "test/factories/make-client-customer";
import { makeClientShipper } from "test/factories/make-client-shipper";
import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: FetchClientsByTypeUseCase;

describe("Fetch Clients By Type", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new FetchClientsByTypeUseCase(inMemoryClientsRepository);
  });

  it("should be able to fetch clients by type", async () => {
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        await inMemoryClientsRepository.create(
          makeClientCustomer(
            { name: `Custom Name ${i}` },
            new UniqueEntityId(`custom-id-${i}`),
          ),
        );
      } else {
        await inMemoryClientsRepository.create(
          makeClientShipper(
            { name: `Custom Name ${i}` },
            new UniqueEntityId(`custom-id-${i}`),
          ),
        );
      }
    }

    const result = await sut.execute({
      type: "CUSTOMER",
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.clients).toHaveLength(5);
    expect(inMemoryClientsRepository.items).toHaveLength(10);
    expect(inMemoryClientsRepository.items[0]).toMatchObject({
      type: "CUSTOMER",
    });
    expect(inMemoryClientsRepository.items[1]).toMatchObject({
      type: "SHIPPER",
    });
  });
});
