import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { FetchFieldsByTypeUseCase } from "./fetch-fields-by-type";
import { makeFieldCustomer } from "test/factories/make-field-customer";
import { makeFieldShipper } from "test/factories/make-field-shipper";
import { InMemoryFieldsRepository } from "test/repositories/in-memory-fields-repository";
import { InMemoryFieldValuesRepository } from "test/repositories/in-memory-field-values-repository";

let inMemoryFieldValuesRepository: InMemoryFieldValuesRepository;
let inMemoryFieldsRepository: InMemoryFieldsRepository;
let sut: FetchFieldsByTypeUseCase;

describe("Fetch Fields By Type", () => {
  beforeEach(() => {
    inMemoryFieldValuesRepository = new InMemoryFieldValuesRepository();
    inMemoryFieldsRepository = new InMemoryFieldsRepository(
      inMemoryFieldValuesRepository,
    );

    sut = new FetchFieldsByTypeUseCase(inMemoryFieldsRepository);
  });

  it("should be able to fetch fields by type", async () => {
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        await inMemoryFieldsRepository.create(
          makeFieldCustomer(
            { name: `Custom Name ${i}` },
            new UniqueEntityId(`custom-id-${i}`),
          ),
        );
      } else {
        await inMemoryFieldsRepository.create(
          makeFieldShipper(
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
    expect(result.value?.fields).toHaveLength(5);
    expect(inMemoryFieldsRepository.items).toHaveLength(10);
    expect(inMemoryFieldsRepository.items[0]).toMatchObject({
      type: "CUSTOMER",
    });
    expect(inMemoryFieldsRepository.items[1]).toMatchObject({
      type: "SHIPPER",
    });
  });
});
