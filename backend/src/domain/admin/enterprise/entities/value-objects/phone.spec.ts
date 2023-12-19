import { Phone } from "./phone";

describe("Phone Value Object", () => {
  it("should be able to create a formated phone value", () => {
    const formated = Phone.create("(11)9 8899-7755");

    expect(formated.value).toEqual("11988997755");
  });
});
