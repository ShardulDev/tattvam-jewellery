import { describe, expect, it } from "vitest";
import { getServerEnv } from "./env";

describe("server environment validation", () => {
  it("allows the app to run without a database configured", () => {
    const original = process.env.DATABASE_URL;
    try {
      delete process.env.DATABASE_URL;
      expect(getServerEnv().DATABASE_URL).toBeUndefined();
    } finally {
      if (original !== undefined) process.env.DATABASE_URL = original;
    }
  });

  it("rejects malformed database URLs", () => {
    const original = process.env.DATABASE_URL;
    try {
      process.env.DATABASE_URL = "not-a-url";
      expect(() => getServerEnv()).toThrow();
    } finally {
      if (original === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = original;
    }
  });
});
