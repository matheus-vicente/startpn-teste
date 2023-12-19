export class Phone {
  public value: string;

  private format(value: string): string {
    const regex = /[^0-9]/g;

    return value.replace(regex, "");
  }

  private constructor(value: string) {
    this.value = this.format(value);
  }

  static create(value: string): Phone {
    return new Phone(value);
  }
}
