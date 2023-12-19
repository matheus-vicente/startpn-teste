import { type Either, left, right } from "@/core/either";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";

import { User } from "../../enterprise/entities/user";
import { Phone } from "../../enterprise/entities/value-objects/phone";
import { type UserResponse } from "../types/user-response";
import { type HashProvider } from "../providers/HashProvider/hash-provider";
import { type UsersRepository } from "../repositories/users-repository";

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export type CreateUserUseCaseResponse = Either<
  ResourceAlreadyStoredError,
  {
    user: UserResponse;
  }
>;

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execte({
    name,
    email,
    phone,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailAlreadyStored = await this.usersRepository.findByEmail(email);

    if (emailAlreadyStored) {
      return left(new ResourceAlreadyStoredError());
    }

    let item: Phone | undefined;

    if (phone) {
      item = Phone.create(phone);
    }

    const hashedPassword = await this.hashProvider.hash(password);

    const user = User.create({
      name,
      email,
      phone: item,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return right({
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone?.value,
      },
    });
  }
}
