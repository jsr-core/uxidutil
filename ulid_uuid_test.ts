import { assertEquals } from "@std/assert";
import { formatUlid, parseUlid } from "./ulid.ts";
import { formatUuid, parseUuid } from "./uuid.ts";

Deno.test("UUID and ULID can be converted to each other via Uint8Array.", async (t) => {
  await t.step("UUID to ULID", () => {
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    const bytes = parseUuid(uuid);
    const ulid = formatUlid(bytes);
    const roundTrip = formatUuid(parseUlid(ulid));
    assertEquals(roundTrip, uuid);
  });

  await t.step("ULID to UUID", () => {
    const ulid = "01HZYHQ6X4V9E9ZEM8Y6MVPMX3";
    const bytes = parseUlid(ulid);
    const uuid = formatUuid(bytes);
    const roundTrip = formatUlid(parseUuid(uuid));
    assertEquals(roundTrip, ulid);
  });
});
