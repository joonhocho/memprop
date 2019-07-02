export const getType = (v: unknown): string => {
  const type = typeof v;
  if (type === 'object') {
    if (v == null) {
      return 'null';
    }
    const { constructor } = v as any;
    if (constructor == null || constructor === Object) {
      // plain object
      return 'json';
    }
    if (constructor === Array) {
      // plain array
      return 'array';
    }
  }
  return type;
};

export const shallowEqualObjects = (
  a: Record<string, any>,
  b: Record<string, any>
): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0, len = aKeys.length; i < len; i += 1) {
    const k = aKeys[i];
    if (!(b.hasOwnProperty(k) && a[k] === b[k])) {
      return false;
    }
  }

  return true;
};

export const shallowEqualArrays = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0, len = a.length; i < len; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};
