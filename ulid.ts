const ULID_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ULID_CHAR_TO_VALUE = new Map(
  ULID_ALPHABET.split("").map((char, index) => [char, index]),
);

/**
 * Parse a ULID string into a Uint8Array
 */
export function parseUlid(ulid: string): Uint8Array {
  if (!/^[0-9A-HJKMNP-TV-Z]{26}$/.test(ulid)) {
    throw new Error(
      "Invalid ULID: must be 26 characters using Crockford Base32 (excluding I, L, O, U)",
    );
  }

  let value = 0n;
  for (const char of ulid) {
    // We already checked the format, so this should not be undefined.
    const val = ULID_CHAR_TO_VALUE.get(char)!;
    value = (value << 5n) | BigInt(val);
  }

  const bytes = new Uint8Array(16);
  for (let i = 15; i >= 0; i--) {
    bytes[i] = Number(value & 0xffn);
    value >>= 8n;
  }

  return bytes;
}

/**
 * Format a Uint8Array into a ULID string
 */
export function formatUlid(bytes: Uint8Array): string {
  if (bytes.length !== 16) {
    throw new Error("ULID must be 16 bytes");
  }

  let value = 0n;
  for (const byte of bytes) {
    value = (value << 8n) | BigInt(byte);
  }

  const chars = Array(26);
  for (let i = 25; i >= 0; i--) {
    const index = Number(value & 31n);
    chars[i] = ULID_ALPHABET[index];
    value >>= 5n;
  }

  return chars.join("");
}
