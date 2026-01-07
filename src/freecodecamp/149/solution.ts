export function vowelCase(str: string): string {
  const vowels = ["a", "e", "i", "o", "u"];

  return Array.from(str.toLowerCase())
    .map((char) => (vowels.includes(char) ? char.toUpperCase() : char))
    .join("");
}
