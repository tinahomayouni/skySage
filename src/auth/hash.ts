export function encode(input: string, shift: number): string {
  if (shift >= 10) shift = shift % 10;
  return String(
    input
      .split('')
      .map((n) => parseInt(n) + shift)
      .reduce((a, b) => a * b, 1),
  );
}
