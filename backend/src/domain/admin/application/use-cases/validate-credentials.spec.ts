import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { ValidateCredentialsUseCase } from "./validate-credentials";
import { makeUser } from "test/factories/make-user";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { BcryptHashImplementation } from "../providers/HashProvider/bcrypt/bcrypt-hash-implementation";

let inMemoryUsersRepository: InMemoryUsersRepository;
let hashProvider: BcryptHashImplementation;
let sut: ValidateCredentialsUseCase;

describe("Validate Credentials", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    hashProvider = new BcryptHashImplementation();

    sut = new ValidateCredentialsUseCase(inMemoryUsersRepository, hashProvider);
  });

  it("should be able to validate user's credentials", async () => {
    const hashed = await hashProvider.hash("custom123");

    const user = makeUser({
      email: "custom@email.com",
      password: hashed,
    });

    await inMemoryUsersRepository.create(user);

    const result = await sut.execute({
      email: "custom@email.com",
      password: "custom123",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({
      ok: true,
    });
  });

  it("should not be able to validate user's credentials with wrong email/password", async () => {
    inMemoryUsersRepository.create(
      makeUser({
        email: "custom@email.com",
        password: "custom123",
      }),
    );

    // Testing wrong email
    const result = await sut.execute({
      email: "custom1@email.com",
      password: "custom123",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);

    // Testing wrong password
    const result2 = await sut.execute({
      email: "custom@email.com",
      password: "custom12",
    });

    expect(result2.isLeft()).toBe(true);
    expect(result2.value).toBeInstanceOf(WrongCredentialsError);
  });
});
