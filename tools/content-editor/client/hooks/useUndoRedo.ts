import { useState, useCallback } from "react";
import { deepClone, deepEqual } from "../lib/format";

export interface UndoRedoState<T> {
  state: T;
  set: (next: T | ((prev: T) => T)) => void;
  reset: (init: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function useUndoRedo<T>(initialPresent: T): UndoRedoState<T> {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;
    const previous = past[past.length - 1]!;
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  }, [canUndo, past, present, future]);

  const redo = useCallback(() => {
    if (!canRedo) return;
    const next = future[0]!;
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [canRedo, past, present, future]);

  const set = useCallback(
    (nextVal: T | ((prev: T) => T)) => {
      setPresent((curr) => {
        const computed = typeof nextVal === "function" ? (nextVal as any)(curr) : nextVal;
        if (deepEqual(curr, computed)) {
          return curr;
        }
        setPast((prevPast) => [...prevPast, deepClone(curr)]);
        setFuture([]);
        return computed;
      });
    },
    []
  );

  const reset = useCallback((init: T) => {
    setPresent(init);
    setPast([]);
    setFuture([]);
  }, []);

  return {
    state: present,
    set,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
