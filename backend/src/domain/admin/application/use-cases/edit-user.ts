import { type Either, left, right } from "@/core/either";
import { type UserResponse } from "../types/user-response";
import { type UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { type ResourceAlreadyStoredError } from "@/core/errors/errors/resource-already-stored-error";
import { Phone } from "../../enterprise/entities/value-objects/phone";

interface EditUserUseCaseRequest {
  id: string;
  name: string;
  phone?: string;
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyStoredError,
  {
    user: UserResponse;
  }
>;

export class EditUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    phone,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    user.name = name;

    if (phone) {
      user.phone = Phone.create(phone);
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
