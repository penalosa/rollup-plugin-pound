import poundPlugin from '../../src/index'
export default {
    input: 'index.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        poundPlugin()
    ]
};