import { EditUsersCredentialsUseCase } from "./edit-users-credentials";
import { makeUser } from "test/factories/make-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";

let sut: EditUsersCredentialsUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Update User's Credentials", () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    sut = new EditUsersCredentialsUseCase(inMemoryUsersRepository);
  });

  it("should be able to edit user's credentials", async () => {
    const user = makeUser(
      {
        name: "Custom name",
        email: "custom@email.com",
        password: "123456",
      },
      new UniqueEntityId("custom-id"),
    );

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      id: "custom-id",
      email: "teste@email.com",
      password: "987654",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
    expect(inMemoryUsersRepository.items[0]).toMatchObject({
      email: "teste@email.com",
      password: "987654",
    });
  });

  it("should not be able to edit user's credentials in case of email have already been stored", async () => {
    inMemoryUsersRepository.items.push(
      makeUser(
        {
          name: "Custom name",
          email: "custom01@email.com",
          password: "123456",
        },
        new UniqueEntityId("custom-01"),
      ),
      makeUser(
        {
          name: "Custom name",
          email: "custom02@email.com",
          password: "123456",
        },
        new UniqueEntityId("custom-02"),
      ),
    );

    const result = await sut.execute({
      id: "custom-01",
      email: "custom02@email.com",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
