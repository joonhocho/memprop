import { memprop } from './index';

test('memprop with fn', () => {
  const mem = memprop();

  const fn1 = (): null => null;
  const fn2 = (): any => 1;
  const fn3 = (): any => 2;

  // no args => always return the first one
  expect(mem(fn1)).toBe(fn1);
  expect(mem(() => null)).toBe(fn1);
  expect(mem(() => 1)).toBe(fn1);

  // new args, new prop
  expect(mem(fn2, [1])).toBe(fn2);

  // same args values, old prop
  expect(mem(() => 2, [1])).toBe(fn2);

  // new args values, new prop
  expect(mem(fn3, [1, 2])).toBe(fn3);

  // same args values, old prop
  expect(mem(() => 4, [1, 2])).toBe(fn3);

  // same prop, same prop
  expect(mem(fn3, [1, 2, 3])).toBe(fn3);

  // new args values, new prop
  expect(mem(fn2, [1])).toBe(fn2);
  expect(mem(fn3, [1])).toBe(fn2);
});

test('memprop with object', () => {
  const mem = memprop();

  const o1 = { a: 1 };
  const o2 = { b: 2 };
  const o3 = { c: undefined };
  const o4 = { d: undefined };

  // no args => always return the first one
  expect(mem(o1)).toBe(o1);
  expect(mem({})).toBe(o1);

  // new args, new prop
  expect(mem(o2, [1])).toBe(o2);

  // same args values, old prop
  expect(mem({}, [1])).toBe(o2);

  // new args values, new prop
  expect(mem(o3, [1, 2])).toBe(o3);

  // same args values, old prop
  expect(mem({}, [1, 2])).toBe(o3);

  // same prop, same prop
  expect(mem(o3, [1, 2, 3])).toBe(o3);

  // new args values, new prop
  expect(mem(o2, [1])).toBe(o2);
  expect(mem(o3, [1])).toBe(o2);

  // new args, but equal prop -> old prop
  expect(mem({ b: 2 }, [2])).toBe(o2);

  expect(mem(o3, [3])).toBe(o3);

  expect(mem({ c: undefined }, [2])).toBe(o3);
  expect(mem(o4, [3])).toBe(o4);
});

test('memprop with array', () => {
  const mem = memprop();

  const o1 = [1];
  const o2 = [2];
  const o3 = [3];

  // no args => always return the first one
  expect(mem(o1)).toBe(o1);
  expect(mem({})).toBe(o1);

  // new args, new prop
  expect(mem(o2, [1])).toBe(o2);

  // same args values, old prop
  expect(mem({}, [1])).toBe(o2);

  // new args values, new prop
  expect(mem(o3, [1, 2])).toBe(o3);

  // same args values, old prop
  expect(mem({}, [1, 2])).toBe(o3);

  // same prop, same prop
  expect(mem(o3, [1, 2, 3])).toBe(o3);

  // new args values, new prop
  expect(mem(o2, [1])).toBe(o2);
  expect(mem(o3, [1])).toBe(o2);

  // new args, but equal prop -> old prop
  expect(mem([2], [2])).toBe(o2);

  expect(mem(o3, [3])).toBe(o3);
});
