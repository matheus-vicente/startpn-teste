import { hash, compare } from "bcrypt";

import { type HashProvider } from "../hash-provider";

export class BcryptHashImplementation implements HashProvider {
  async hash(text: string): Promise<string> {
    return await hash(text, 8);
  }

  async match(text: string, textToCompare: string): Promise<boolean> {
    return await compare(text, textToCompare);
  }
}
