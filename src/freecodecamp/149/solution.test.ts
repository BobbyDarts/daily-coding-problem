import { vowelCase } from "./solution";

describe("Problem 149: vOwElcAsE", () => {
  test("converts vowels to uppercase and consonants to lowercase", () => {
    expect(vowelCase("vowelcase")).toBe("vOwElcAsE");
  });

  test("handles spaces correctly", () => {
    expect(vowelCase("coding is fun")).toBe("cOdIng Is fUn");
  });

  test("handles mixed casing and punctuation", () => {
    expect(vowelCase("HELLO, world!")).toBe("hEllO, wOrld!");
  });

  test("handles hyphenated words", () => {
    expect(vowelCase("git cherry-pick")).toBe("gIt chErry-pIck");
  });

  test("leaves non-alphabetical characters unchanged", () => {
    expect(vowelCase("HEAD~1")).toBe("hEAd~1");
  });

  // Optional safety checks
  test("handles empty string", () => {
    expect(vowelCase("")).toBe("");
  });

  test("handles string with no vowels", () => {
    expect(vowelCase("bcdfg")).toBe("bcdfg");
  });
});
