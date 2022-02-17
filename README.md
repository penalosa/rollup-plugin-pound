# rollup-plugin-pound

Get rid of those pesky American $ signs in your Javascript template literals—replace them with good old British £ symbols, or any other supported currency!

## Example

Add it to your Rollup plugin list:

```js
import currencyPlugin from 'rollup-plugin-pound'
// rollup.config.js
export default {
 ...
 plugins: [
        currencyPlugin()
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

It even supports other currencies! Just provide the currency code like so:

```js
// rollup.config.js
export default {
 ...
 plugins: [
        currencyPlugin({currency: "EUR"})
    ]
 ...
}
```

And watch as

```js
// Your code
console.log(`Hello €{process.argv[2]}`);
```

is transformed to

```js
// Transpiled code
console.log(`Hello ${process.argv[2]}`);
```

It goes without saying that `USD` isn't supported though—no need to transpile when you have native browser support!

> No guarantees are provided as to whether currency symbols _not_ in template strings will be transpiled; an attempt is made, but Javascript is complicated 😂
