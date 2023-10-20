import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';

console.log("[ start ] - env: ", process.env.NODE_ENV);

export default defineConfig([{
    input: "src/main.ts",
    plugins: [
        typescript(),
        commonjs({
            include: 'node_modules/**',  // Default: undefined
            extensions: ['.js', '.coffee'],  // Default: [ '.js' ]
            ignoreGlobal: false,  // Default: false
            sourceMap: false,  // Default: true
            ignore: ['conditional-runtime-dependency']
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
        }),
        url({
            publicPath: 'dist/',
        }),
        json(),
    ],
    output: [{
        file: "dist/main.js",
        format: "cjs",
        sourcemap: true
    }]
}]);
