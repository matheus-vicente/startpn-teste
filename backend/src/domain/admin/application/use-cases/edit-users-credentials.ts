import { type Either, left, right } from "@/core/either";
import { type UserResponse } from "../types/user-response";
import { type UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";

interface EditUsersCredentialsUseCaseRequest {
  id: string;
  email?: string;
  password?: string;
}

type EditUsersCredentialsUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyStoredError,
  {
    user: UserResponse;
  }
>;

export class EditUsersCredentialsUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    id,
    email,
    password,
  }: EditUsersCredentialsUseCaseRequest): Promise<EditUsersCredentialsUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    if (email && email !== user.email) {
      const emailAlreadyStored = await this.usersRepository.findByEmail(email);

      if (emailAlreadyStored) {
        return left(new ResourceAlreadyStoredError());
      }

      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    await this.usersRepository.save(user);

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
