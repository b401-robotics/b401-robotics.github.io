import { useMemo } from "react";
import { deepEqual } from "../lib/format";

export function useDirtyState<T>(current: T, original: T | null): boolean {
  return useMemo(() => {
    if (original === null || original === undefined) return false;
    return !deepEqual(current, original);
  }, [current, original]);
}
