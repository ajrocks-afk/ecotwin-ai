export function sanitizeInput(input: string) {
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 50);
}