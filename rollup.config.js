import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import glob from "glob"

// const tests = glob.sync("src/*.test.ts").map(input => ({
//   input,
//   output: {
//     file: `./test/${input.split("/")[1].replace(".ts", ".js")}`,
//     format: "iife",
//     sourceMap: true
//   },
//   plugins: [
//     resolve(),
//     commonjs(),
//     typescript({
//       tsconfigOverride: {
//         compilerOptions: {
//           target: "es5",
//           declaration: false,
//         }
//       }
//     })
//   ]
// }))

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.js",
      format: "cjs",
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: "es5"
          }
        }
      })
    ]
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./dist/index.mjs",
      format: "es",
      sourcemap: true,
      external: ["textcomplete-core"]
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: "es2015"
          }
        }
      })
    ]
  }
]
