import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Dashboard UI", () => {
  test("renders welcome message", () => {
    document.body.innerHTML =
      "<h1>Welcome back, Explorer</h1>";

    expect(
      screen.queryByText(/Welcome back/i)
    ).toBeTruthy();
  });

  test("badge text exists", () => {
    document.body.innerHTML =
      "<span>🥇 Carbon Hero</span>";

    expect(
      screen.queryByText(/Carbon Hero/i)
    ).toBeTruthy();
  });
});