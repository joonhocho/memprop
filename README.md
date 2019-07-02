# memprop
React optimization tool for memoizing (function / object) property to avoid unnecessary re-renders

![npm type definitions](https://img.shields.io/npm/types/memprop.svg)
[![Coverage Status](https://coveralls.io/repos/github/joonhocho/memprop/badge.svg?branch=master)](https://coveralls.io/github/joonhocho/memprop?branch=master)
[![Build Status](https://travis-ci.org/joonhocho/memprop.svg?branch=master)](https://travis-ci.org/joonhocho/memprop)
[![npm version](https://badge.fury.io/js/memprop.svg)](https://badge.fury.io/js/memprop)
[![Dependency Status](https://david-dm.org/joonhocho/memprop.svg)](https://david-dm.org/joonhocho/memprop)
[![GitHub](https://img.shields.io/github/license/joonhocho/memprop.svg)](https://github.com/joonhocho/memprop/blob/master/LICENSE)

## Get Started
```
npm install --save memprop
```
or
```
yarn add memprop
```

## Why
Since everyone starts passing render functions as a `prop` to child component, `PureComponent` is becoming useless. New function instance is re-created in every render, so `PureComponent` cannot prevent unnecessary rerendering.
`memprop` is here to help.

## How it works

`memprop()` creates a new memoize function of type `<T>(propToReuse: T, valuesToWatch?: any) => T`.

if `valuesToWatch` is not provided,
previously stored `propToReuse` will be reused.

if `valuesToWatch` is shallow equal to previous `valuesToWatch`,
previously stored `propToReuse` will be reused.

if `propToReuse` is shallow equal to previous `propToReuse`,
previously stored `propToReuse` will be reused.

otherwise, new `propToReuse` will be stored and return.


## How to Use
```typescript
import { memprop } from 'memprop';

class extends PureComponent {
  // initialize memprop for each prop to memoize
  public memoRender = memprop();

  public memoOptions = memprop();

  public render() {
    return (
      <Select
        options={this.memoOptions(
          [{ value: '1' }, { value: '2' }]
          // no watch args means it will always reuse the first given options
        )}
      >
        {this.memoRender(
          (selectRenderProps) => {
            // render
          },
          // new function prop will be passed only if any of theses values change
          [watch, these, values] // or {watch, these, values} is also supported
        )}
      </Select>
    );
  }
}
```

## License
[MIT License](https://github.com/joonhocho/memprop/blob/master/LICENSE)
