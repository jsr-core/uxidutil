import { assertEquals, assertThrows } from "@std/assert";
import { formatUlid, parseUlid } from "./ulid.ts";

Deno.test("parseUlid", async (t) => {
  await t.step("returns Uint8Array for valid ULID", () => {
    const ulid = "01HZYHQ6X4V9E9ZEM8Y6MVPMX3";
    const bytes = parseUlid(ulid);
    assertEquals(bytes.length, 16);
    const roundTrip = formatUlid(bytes);
    assertEquals(roundTrip, ulid);
  });

  await t.step(
    "throws an error for invalid ULID (include invalid characters)",
    () => {
      assertThrows(
        () => {
          parseUlid("01HZYHQ6X4V9E9ZEM8Y6MVPMX!"); // includes "!"
        },
        Error,
        "Invalid ULID: ",
      );
    },
  );

  await t.step(
    "throws an error for invalid ULID (longer than 26 characters)",
    () => {
      assertThrows(
        () => {
          parseUlid("01HZYHQ6X4V9E9ZEM8Y6MVPMX33"); // 28 chars
        },
        Error,
        "Invalid ULID: must be 26 characters",
      );
    },
  );
});

Deno.test("formatUlid", async (t) => {
  await t.step("returns ULID string for valid Uint8Array", () => {
    const ulid = "01HZYHQ6X4V9E9ZEM8Y6MVPMX3";
    const bytes = parseUlid(ulid);
    const result = formatUlid(bytes);
    assertEquals(result, ulid);
  });

  await t.step("throws an error for invalid Uint8Array (not 16 bytes)", () => {
    assertThrows(
      () => {
        formatUlid(new Uint8Array(15));
      },
      Error,
      "ULID must be 16 bytes",
    );
  });
});
