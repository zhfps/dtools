import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: './packages/index.ts',
        output: {
            dir: 'lib',
            format: 'cjs',
            entryFileNames: '[name].cjs.js',
        },
        plugins: [resolve(), commonjs(), typescript()],
    }, {
        input: './packages/index.ts',
        output: {
            dir: 'lib',
            format: 'esm',
            entryFileNames: '[name].esm.js',
        },
        plugins: [resolve(), commonjs(), typescript()],
    },
    {
        input: './packages/index.ts',
        output: {
            dir: 'lib',
            format: 'umd',
            entryFileNames: '[name].umd.js',
            name: 'dtools'
        },
        plugins: [resolve(), commonjs(), typescript()],
    }
];
