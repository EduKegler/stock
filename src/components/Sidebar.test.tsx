import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders sidebar with correct styling", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass("w-64");
  });

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Assets")).toBeInTheDocument();
  });

  it("highlights active link based on current path", () => {
    render(
      <MemoryRouter initialEntries={["/assets"]}>
        <Sidebar />
      </MemoryRouter>
    );
    const activeLink = screen.getByText("Assets").closest("a");
    expect(activeLink).toHaveClass("text-primary");
  });
});
