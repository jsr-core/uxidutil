# uxidutil

[![jsr](https://jsr.io/badges/@core/uxidutil)](https://jsr.io/@core/uxidutil)\
[![test](https://github.com/jsr-core/uxidutil/workflows/Test/badge.svg)](https://github.com/jsr-core/uxidutil/actions?query=workflow%3ATest)\
[![codecov](https://codecov.io/github/jsr-core/uxidutil/graph/badge.svg?token=pfbLRGU5AM)](https://codecov.io/github/jsr-core/uxidutil)

A minimal utility for converting between [UUID] (Universally Unique IDentifier)
and [ULID] (Universally Unique Lexicographically Sortable Identifier) in their
string and binary (Uint8Array) forms.

[UUID]: https://www.rfc-editor.org/rfc/rfc9562.html
[ULID]: https://github.com/ulid/spec

## Features

- `parseUuid(string)`: Convert UUID string to `Uint8Array`
- `formatUuid(Uint8Array)`: Convert `Uint8Array` to UUID string
- `parseUlid(string)`: Convert ULID string to `Uint8Array`
- `formatUlid(Uint8Array)`: Convert `Uint8Array` to ULID string

## Usage

> [!NOTE]
>
> Use [`@std/uuid`] and [`@std/ulid`] to generate new UUIDs and ULIDs.

[`@std/uuid`]: https://jsr.io/@std/uuid
[`@std/ulid`]: https://jsr.io/@std/ulid

```ts
import {
  formatUlid,
  formatUuid,
  parseUlid,
  parseUuid,
} from "jsr:@core/uxidutil";

const uuid = "123e4567-e89b-12d3-a456-426614174000";
const ulid = "01HZYHQ6X4V9E9ZEM8Y6MVPMX3";

// UUID to bytes and back
const uuidBytes = parseUuid(uuid);
const uuidAgain = formatUuid(uuidBytes);

// ULID to bytes and back
const ulidBytes = parseUlid(ulid);
const ulidAgain = formatUlid(ulidBytes);

// Interchangeable via Uint8Array
const fromUuidToUlid = formatUlid(parseUuid(uuid));
const fromUlidToUuid = formatUuid(parseUlid(ulid));
```

## API

### parseUuid(uuid: string): Uint8Array

Parses a standard UUID string (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) into a
16-byte array.

### formatUuid(bytes: Uint8Array): string

Formats a 16-byte array into a UUID string.

### parseUlid(ulid: string): Uint8Array

Parses a 26-character ULID string into a 16-byte array. Strictly validates
Crockford Base32 (excluding I, L, O, U).

### formatUlid(bytes: Uint8Array): string

Formats a 16-byte array into a 26-character ULID string.

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
