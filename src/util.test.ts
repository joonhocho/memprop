// tslint:disable max-classes-per-file
import {
  getType,
  shallowEqual,
  shallowEqualArrays,
  shallowEqualObjects,
} from './util';

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

test('shallowEqual', () => {
  class A {}
  class B extends Object {}
  expect(shallowEqual(new A(), {})).toBe(false);
  expect(shallowEqual(new B(), {})).toBe(false);
  expect(shallowEqual(null, null)).toBe(true);
  expect(shallowEqual(null, undefined)).toBe(false);
  expect(shallowEqual(1, 1)).toBe(true);
  expect(shallowEqual(1, '1')).toBe(false);
  expect(shallowEqual(new A(), {})).toBe(false);
  expect(shallowEqual({}, [])).toBe(false);
  const a: any[] = [];
  expect(shallowEqual(a, a)).toBe(true);
  expect(shallowEqual([], [])).toBe(true);
  expect(shallowEqual([undefined], [])).toBe(false);
  expect(shallowEqual([undefined], [undefined])).toBe(true);
  expect(shallowEqual([, 1], [1])).toBe(false);
  expect(shallowEqual([, 1], [, 1])).toBe(true);
  expect(shallowEqual([, undefined], [, null])).toBe(false);
  expect(shallowEqual([, null], [, null])).toBe(true);
  expect(shallowEqual(a, a)).toBe(true);
  expect(shallowEqual({}, {})).toBe(true);
  expect(shallowEqual({ a: 1 }, {})).toBe(false);
  expect(shallowEqual({ a: undefined }, {})).toBe(false);
  expect(shallowEqual({ a: undefined }, { a: undefined })).toBe(true);
  expect(shallowEqual({ a: undefined, b: undefined }, { a: undefined })).toBe(
    false
  );
  expect(
    shallowEqual({ a: undefined, b: undefined }, { b: undefined, a: undefined })
  ).toBe(true);
  expect(
    shallowEqual({ a: undefined, b: null }, { b: undefined, a: undefined })
  ).toBe(false);
  expect(
    shallowEqual({ a: undefined, b: null }, { b: null, a: undefined })
  ).toBe(true);
});
