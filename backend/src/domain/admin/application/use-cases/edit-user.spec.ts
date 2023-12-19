import { EditUserUseCase } from "./edit-user";
import { Phone } from "../../enterprise/entities/value-objects/phone";
import { makeUser } from "test/factories/make-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let sut: EditUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update User", () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new EditUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to edit an user", async () => {
    const user = makeUser(
      {
        name: "Custom name",
      },
      new UniqueEntityId("custom-id"),
    );

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      id: "custom-id",
      name: "Nome Teste",
      phone: "(11)98877-6655",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      name: "Nome Teste",
      phone: Phone.create("11988776655"),
    });
  });
});
