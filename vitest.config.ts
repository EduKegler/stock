import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./setup.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.{ts,tsx}"],
    },
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
  },
});
