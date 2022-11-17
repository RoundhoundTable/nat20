export const throwDice = (amount: number, faces: number) =>
  new Array(amount)
    .fill(null)
    .map(() => Math.floor(Math.random() * (1 - (faces + 1)) + (faces + 1)));
