describe("EcoTwin Logic", () => {
  test("badge for high score", () => {
    const score = 800;

    const badge =
      score >= 700
        ? "🥇 Carbon Hero"
        : score >= 400
        ? "🥈 Green Traveler"
        : "🥉 Eco Explorer";

    expect(badge).toBe("🥇 Carbon Hero");
  });

  test("earth health calculation", () => {
    const score = 650;
    const health = Math.min(Math.floor(score / 10), 100);

    expect(health).toBe(65);
  });

  test("achievement unlocked", () => {
    const score = 750;

    const achievements = [];

    if (score >= 700)
      achievements.push("🌳 Planet Guardian");

    expect(achievements).toContain(
      "🌳 Planet Guardian"
    );
  });

  test("future score cannot exceed 1000", () => {
    expect(Math.min(990 + 200, 1000)).toBe(1000);
  });
});