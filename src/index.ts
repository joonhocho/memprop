import { getType, shallowEqualArrays, shallowEqualObjects } from './util';

export type MemProp = <T>(prop: T, args?: unknown[]) => T;

export const memprop = (): MemProp => {
  let prevArgs: unknown[] | undefined;
  let prevProp: any;
  let prevPropSet = false;

  return <T>(prop: T, args?: unknown[]): T => {
    if (!prevPropSet) {
      // initial call, set prevProp
      prevPropSet = true;
      prevArgs = args;
      return (prevProp = prop);
    }

    if (args === prevArgs || prop === prevProp) {
      // same args or same prop
      // reuse prevProp
      prevArgs = args;
      return prevProp;
    }

    if (!args || !args.length) {
      // no args to compare -> static (never changing) prop
      // reuse prevProp
      prevArgs = args;
      return prevProp;
    }

    if (prevArgs && shallowEqualArrays(prevArgs, args)) {
      // args unchanged
      prevArgs = args;
      return prevProp;
    }

    // args are changed
    const type = getType(prop);
    if (type === 'json') {
      // shallow compare plain objects
      if (getType(prevProp) === type && shallowEqualObjects(prop, prevProp)) {
        // prop unchanged
        prevArgs = args;
        return prevProp;
      }
    } else if (type === 'array') {
      // shallow compre plain arrays
      if (
        getType(prevProp) === type &&
        shallowEqualArrays(prop as any, prevProp)
      ) {
        // prop unchanged
        prevArgs = args;
        return prevProp;
      }
    }

    // args && prop changed
    prevArgs = args;
    return (prevProp = prop);
  };
};
