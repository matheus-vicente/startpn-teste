import { type HashProvider } from "../hash-provider";
import { BcryptHashImplementation } from "./bcrypt-hash-implementation";

let hashImplementation: HashProvider;

describe("Bcrypt Hash Implementation", () => {
  beforeEach(() => {
    hashImplementation = new BcryptHashImplementation();
  });

  it("should be able to hash a text", async () => {
    const text = "some-text";

    const hashed = await hashImplementation.hash(text);

    const result = await hashImplementation.match(text, hashed);

    expect(result).toBe(true);
  });
});
