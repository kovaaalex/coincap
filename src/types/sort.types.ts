import type { ICrypto } from "./crypto.types";

export type SortField = keyof ICrypto;
export type SortDirection = 'asc' | 'desc';