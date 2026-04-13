export function extractList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }
  if (payload && typeof payload === "object" && Array.isArray((payload as { results?: unknown[] }).results)) {
    return (payload as { results: T[] }).results;
  }
  return [];
}

export function extractItem<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }
  return payload as T;
}
