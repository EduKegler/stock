import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import Header from "./Header";

describe("Header", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders Dashboard title when on root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders Assets title when on assets path", () => {
    render(
      <MemoryRouter initialEntries={["/assets"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Assets")).toBeInTheDocument();
  });

  it("renders asset symbol when on specific asset path", () => {
    render(
      <MemoryRouter initialEntries={["/assets/BTC"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("renders header with correct styling", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("h-16", "border-solid", "p-4", "pl-8");
  });
});
