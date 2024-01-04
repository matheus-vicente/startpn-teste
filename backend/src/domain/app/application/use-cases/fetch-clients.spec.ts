import { InMemoryClientsRepository } from "test/repositories/in-memory-clients-repository";
import { FetchClientsUseCase } from "./fetch-clients";
import { makeClientCustomer } from "test/factories/make-client-customer";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryClientsRepository: InMemoryClientsRepository;
let sut: FetchClientsUseCase;

describe("Fetch Clients", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryClientsRepository = new InMemoryClientsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new FetchClientsUseCase(inMemoryClientsRepository);
  });

  it("should be able to fetch clients", async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryClientsRepository.create(
        makeClientCustomer({ name: `Custom Name ${i}` }),
      );
    }

    const result = await sut.execute({ page: 1 });

    expect(result.isRight()).toBe(true);
    expect(inMemoryClientsRepository.items).toHaveLength(10);
  });
});
