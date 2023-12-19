import { type UsersRepository } from "@/domain/admin/application/repositories/users-repository";
import { type User } from "@/domain/admin/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    this.items[itemIndex] = user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.items.find((item) => item.id.toString() === id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.items.find((item) => item.email === email);

    return user;
  }
}
