// 用于在node_modules中使用第三方模块。
import resolve from "@rollup/plugin-node-resolve"
import commandjs from "@rollup/plugin-commonjs"
// import { terser } from "rollup-plugin-terser"
import terser from "@rollup/plugin-terser"
import typescript2 from "rollup-plugin-typescript2"
// import typescript2 from '@rollup/plugin-typescript'
import del from "rollup-plugin-delete"
import babel from "@rollup/plugin-babel"
import postcss from "rollup-plugin-postcss"
import alias from "@rollup/plugin-alias"
import serveDev from "rollup-plugin-serve"
import liveLoad from "rollup-plugin-livereload"
import replace from "@rollup/plugin-replace"
import html from "@rollup/plugin-html"
import htmlTemplate from "rollup-plugin-generate-html-template"

const DeclarationFiles = { compilerOptions: { declaration: true } }
export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.js",
      format: "iife",
      name: "version",
      sourcemap: true,
    },
    // {
    //   file: "es/index.js",
    //   format: "es",
    //   sourcemap: true,
    // },
  ],
  // external: ["react", "react-dom"],
  plugins: [
    // 支持import引入
    resolve(),
    // 支持commandjs
    commandjs(),
    // 别名
    alias({
      entries: [{ find: "@", replacement: "src" }],
    }),
    // 本地服务
    serveDev({
      contentBase: "", // 服务器启动文件夹, 默认是项目根目录,需要在该文件下建立index.html
      port: 3334, // 端口
    }),
    // // hrm
    liveLoad(),
    // html(),
    // 打包时删除旧的dist文件
    del({
      targets: "dist/*",
      verbose: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"), // 否则会报：process is not defined的错
    }),

    // ts
    typescript2({ tsconfigOverride: DeclarationFiles }),

    //   typescript({
    // 导出声明文件
    //     outDir: "dist",
    //     declaration: true,
    //     declarationDir: "dist",
    // })

    // css
    postcss(),
    // babel,es6 -> es5 同时预设里,增加react的解析
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    /**
     *
     */
    // 压缩
    terser(),
  ],
}
