import { getType, shallowEqualArrays, shallowEqualObjects } from './util';

test('getType', () => {
  expect(getType(undefined)).toBe('undefined');
  expect(getType(null)).toBe('null');
  expect(getType(true)).toBe('boolean');
  expect(getType(0)).toBe('number');
  expect(getType('')).toBe('string');
  expect(getType({})).toBe('json');
  expect(getType([])).toBe('array');
  expect(getType(new Date())).toBe('object');
  expect(getType(/a/)).toBe('object');
});

test('shallowEqualObjects', () => {
  expect(shallowEqualObjects({}, {})).toBe(true);
  expect(shallowEqualObjects({ a: 1 }, {})).toBe(false);
  expect(shallowEqualObjects({ a: undefined }, {})).toBe(false);
  expect(shallowEqualObjects({ a: undefined }, { a: undefined })).toBe(true);
  expect(
    shallowEqualObjects({ a: undefined, b: undefined }, { a: undefined })
  ).toBe(false);
  expect(
    shallowEqualObjects(
      { a: undefined, b: undefined },
      { b: undefined, a: undefined }
    )
  ).toBe(true);
  expect(
    shallowEqualObjects(
      { a: undefined, b: null },
      { b: undefined, a: undefined }
    )
  ).toBe(false);
  expect(
    shallowEqualObjects({ a: undefined, b: null }, { b: null, a: undefined })
  ).toBe(true);
});

test('shallowEqualArrays', () => {
  expect(shallowEqualArrays([], [])).toBe(true);
  expect(shallowEqualArrays([undefined], [])).toBe(false);
  expect(shallowEqualArrays([undefined], [undefined])).toBe(true);
  expect(shallowEqualArrays([, 1], [1])).toBe(false);
  expect(shallowEqualArrays([, 1], [, 1])).toBe(true);
  expect(shallowEqualArrays([, undefined], [, null])).toBe(false);
  expect(shallowEqualArrays([, null], [, null])).toBe(true);
});
