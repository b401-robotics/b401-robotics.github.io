export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  return JSON.parse(JSON.stringify(obj));
}

export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null || b === null) return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const k of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!deepEqual(a[k], b[k])) return false;
  }

  return true;
}

export function getByPath(obj: any, path: string[]): any {
  let curr = obj;
  for (const key of path) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[key];
  }
  return curr;
}

export function setByPath(obj: any, path: string[], value: any): any {
  if (path.length === 0) return value;
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let curr = clone;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]!;
    if (curr[key] === undefined || curr[key] === null) {
      const nextKey = path[i + 1]!;
      curr[key] = /^\d+$/.test(nextKey) ? [] : {};
    } else {
      curr[key] = Array.isArray(curr[key]) ? [...curr[key]] : { ...curr[key] };
    }
    curr = curr[key];
  }

  const lastKey = path[path.length - 1]!;
  curr[lastKey] = value;
  return clone;
}

export function deleteByPath(obj: any, path: string[]): any {
  if (path.length === 0) return undefined;
  const clone = Array.isArray(obj) ? [...obj] : { ...obj };
  let curr = clone;

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]!;
    if (curr[key] === undefined) return clone;
    curr[key] = Array.isArray(curr[key]) ? [...curr[key]] : { ...curr[key] };
    curr = curr[key];
  }

  const lastKey = path[path.length - 1]!;
  if (Array.isArray(curr)) {
    const index = Number(lastKey);
    curr.splice(index, 1);
  } else {
    delete curr[lastKey];
  }

  return clone;
}
