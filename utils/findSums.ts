export const findSums = (input: string) => {
  const match = input.match(/\+[\d][\d]*(?!d)/g);

  if (!match) return [];

  return match.map((n) => parseInt(n));
};
