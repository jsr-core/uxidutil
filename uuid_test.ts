import { assertEquals, assertThrows } from "@std/assert";
import { formatUuid, parseUuid } from "./uuid.ts";

Deno.test("parseUuid", async (t) => {
  await t.step("returns Uint8Array for valid UUID", () => {
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    const bytes = parseUuid(uuid);
    assertEquals(bytes.length, 16);
    const roundTrip = formatUuid(bytes);
    assertEquals(roundTrip, uuid);
  });

  await t.step(
    "throws an error for invalid UUID (include invalid characters)",
    () => {
      assertThrows(
        () => {
          parseUuid("123e4567-e89b-12d3-a456-42661417zzzz"); // "z" is invalid in hex
        },
        Error,
        "Invalid UUID string",
      );
    },
  );

  await t.step(
    "throws an error for invalid UUID (longer than 32 characters)",
    () => {
      assertThrows(
        () => {
          parseUuid("123e4567-e89b-12d3-a456-42661417400000"); // too long
        },
        Error,
        "Invalid UUID string",
      );
    },
  );
});

Deno.test("formatUuid", async (t) => {
  await t.step("returns UUID string for valid Uint8Array", () => {
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    const bytes = parseUuid(uuid);
    const result = formatUuid(bytes);
    assertEquals(result, uuid);
  });

  await t.step("throws an error for invalid Uint8Array (not 16 bytes)", () => {
    assertThrows(
      () => {
        formatUuid(new Uint8Array(15));
      },
      Error,
      "UUID must be 16 bytes",
    );
  });
});
