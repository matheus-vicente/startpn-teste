import { makeUser } from "test/factories/make-user";
import { CreateUserUseCase } from "./create-user";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { BcryptHashImplementation } from "../providers/HashProvider/bcrypt/bcrypt-hash-implementation";

let inMemoryUsersRepository: InMemoryUsersRepository;
let hashProvider: BcryptHashImplementation;
let sut: CreateUserUseCase;

describe("Create User", () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    hashProvider = new BcryptHashImplementation();

    sut = new CreateUserUseCase(inMemoryUsersRepository, hashProvider);
  });

  it("should be able to create an user", async () => {
    const result = await sut.execte({
      name: "Nome Teste",
      email: "teste@email.com",
      phone: "(11)98877-6655",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });

  it("should not be able to create an user with an used email", async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        email: "teste@email.com",
      }),
    );

    const result = await sut.execte({
      name: "Nome Teste",
      email: "teste@email.com",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceAlreadyStoredError);
  });
});
