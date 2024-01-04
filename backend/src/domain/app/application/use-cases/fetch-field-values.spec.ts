import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";
import { FetchFieldValuesUseCase } from "./fetch-field-values";
import { makeFieldValue } from "test/factories/make-field-value";

let inMemoryFieldsValueRepository: InMemoryFieldValuesRepository;
let sut: FetchFieldValuesUseCase;

describe("Fetch Field Values", () => {
  beforeEach(() => {
    inMemoryFieldsValueRepository = new InMemoryFieldValuesRepository();

    sut = new FetchFieldValuesUseCase(inMemoryFieldsValueRepository);
  });

  it("should be able to fetch field values", async () => {
    for (let i = 0; i < 10; i++) {
      await inMemoryFieldsValueRepository.create(
        makeFieldValue({ value: `Custom Value ${i}` }),
      );
    }

    const result = await sut.execute({ page: 1 });

    expect(result.isRight()).toBe(true);
    expect(inMemoryFieldsValueRepository.items).toHaveLength(10);
  });
});
