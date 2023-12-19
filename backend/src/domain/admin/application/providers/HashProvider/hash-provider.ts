export interface HashProvider {
  hash: (text: string) => Promise<string>;
  match: (text: string, textToCompare: string) => Promise<boolean>;
}
