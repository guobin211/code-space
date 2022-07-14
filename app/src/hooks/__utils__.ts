import { DependencyList } from 'react';

export function isEqual(a: any, b: any) {
  return a === b || (a !== a && b !== b);
}

export function isDeepEqual(a: any, b: any) {
  if (a === null && b === null) {
    return true;
  }
  if (a === undefined && b === undefined) {
    return true;
  }
  // -0, 0, +0 都看做是相等的
  if (a == 0 && b == 0) {
    return true;
  }
  const typeA = Object.prototype.toString.call(a);
  const typeB = Object.prototype.toString.call(b);
  if (typeA === typeB) {
    return a === b;
  } else {
    return false;
  }
}

export function isShallowEqual(a: any, b: any) {
  return a == b;
}

export function jsonEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function depsEqual(aDeps: DependencyList, bDeps: DependencyList = []) {
  return aDeps.length === bDeps.length
}
