import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function eqRegExp(x: RegExp, y: RegExp): boolean {
  return (
    x.source === y.source &&
    x.flags.split("").sort().join("") === y.flags.split("").sort().join("")
  );
}

export function eq(
  valA: unknown,
  valB: unknown,
  deep = true,
  explicit: string[] = ["__key"],
): boolean {
  if (valA === valB) return true;

  if (
    typeof valB === "object" &&
    typeof valA === "object" &&
    valA !== null &&
    valB !== null
  ) {
    if (valA instanceof Map) return false;
    if (valA instanceof Set) return false;
    if (valA instanceof Date && valB instanceof Date)
      return valA.getTime() === valB.getTime();
    if (valA instanceof RegExp && valB instanceof RegExp)
      return eqRegExp(valA, valB);
    // if (false) return false;

    const objA = valA as Record<string, unknown>;
    const objB = valB as Record<string, unknown>;

    if (Object.keys(objA).length !== Object.keys(objB).length) return false;

    for (const k of explicit) {
      if ((k in objA || k in objB) && objA[k] !== objB[k]) return false;
    }

    for (const key in objA) {
      if (!(key in objB)) return false;
      if (objA[key] !== objB[key] && !deep) return false;
      if (deep && !eq(objA[key], objB[key], deep, explicit)) return false;
    }
    return true;
  }
  return false;
}
