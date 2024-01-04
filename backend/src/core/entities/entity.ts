import { UniqueEntityId } from "./unique-entity-id";

export abstract class Entity<T> {
  private readonly _id: UniqueEntityId;
  protected props: T;

  protected constructor(props: T, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId(id);
    this.props = props;
  }

  get id(): UniqueEntityId {
    return this._id;
  }
}
