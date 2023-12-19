import { type Either, left, right } from "@/core/either";
import { type UsersRepository } from "../repositories/users-repository";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";
import { type HashProvider } from "../providers/HashProvider/hash-provider";

interface ValidateCredentialsUseCaseRequest {
  email: string;
  password: string;
}

type ValidateCredentialsUseCaseResponse = Either<
  WrongCredentialsError,
  {
    ok: boolean;
  }
>;

export class ValidateCredentialsUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute({
    email,
    password,
  }: ValidateCredentialsUseCaseRequest): Promise<ValidateCredentialsUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const passwordMatch = await this.hashProvider.match(
      password,
      user.password,
    );

    if (!passwordMatch) {
      return left(new WrongCredentialsError());
    }

    return right({
      ok: true,
    });
  }
}
