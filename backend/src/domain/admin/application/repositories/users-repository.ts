import { type User } from "../../enterprise/entities/user";

export interface UsersRepository {
  save: (user: User) => Promise<void>;
  create: (user: User) => Promise<void>;
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (id: string) => Promise<User | undefined>;
}
