import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";
import { FetchFieldsUseCase } from "./fetch-fields";
import { makeFieldCustomer } from "test/factories/make-field-customer";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: FetchFieldsUseCase;

describe("Fetch Fields", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new FetchFieldsUseCase(inMemoryFieldsRepository);
  });

  it("should be able to fetch fields", async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryFieldsRepository.create(
        makeFieldCustomer({ name: `Custom Name ${i}` }),
      );
    }

    const result = await sut.execute({ page: 1 });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsRepository.items).toHaveLength(10);
  });
});
