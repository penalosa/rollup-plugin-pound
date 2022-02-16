# rollup-plugin-pound

Get rid of those pesky American $ signs in your Javascript template literals—replace them with good old British £ symbols!

## Example

Add it to your Rollup plugin list:

```js
// rollup.config.js
export default {
 ...
 plugins: [
        poundPlugin()
    ]
 ...
}
```

And watch as

```js
// Your code
console.log(`Hello £{process.argv[2]}`);
```

is transformed to

```js
// Transpiled code
console.log(`Hello ${process.argv[2]}`);
```

Perfect!

> No guarantees are provided as to whether £ symbols _not_ in template strings will be transpiled
