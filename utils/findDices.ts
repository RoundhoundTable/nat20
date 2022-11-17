export const findDices = (input: string) => {
  return input.match(/-?[0-9]+d[0-9]+/g) ?? [];
};
