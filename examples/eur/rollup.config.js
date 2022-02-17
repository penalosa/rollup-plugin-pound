import currencyPlugin from '../../src/index'
export default {
    input: 'index.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        currencyPlugin({ currency: "EUR" })
    ]
};