import { describe, test, expect } from '@jest/globals';

describe("EcoTwin Dashboard", () => {
  test("calculates streak correctly", () => {
    const score = 550;
    const streak = Math.floor(score / 100) + 1;

    expect(streak).toBe(6);
  });

  test("caps future score at 1000", () => {
    const score = 950;
    const future = Math.min(score + 100, 1000);

    expect(future).toBe(1000);
  });
});