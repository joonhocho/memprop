import { shallowEqual } from './util';

export type MemProp = <T>(prop: T, args?: unknown) => T;

export const memprop = (): MemProp => {
  let prevArgs: unknown;
  let prevProp: any;
  let prevPropSet = false;

  return <T>(prop: T, args?: unknown): T => {
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

    if (shallowEqual(args, prevArgs) || shallowEqual(prop, prevProp)) {
      // args or prop unchanged
      prevArgs = args;
      return prevProp;
    }

    // args && prop changed
    prevArgs = args;
    return (prevProp = prop);
  };
};
