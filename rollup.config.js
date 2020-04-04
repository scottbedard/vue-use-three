import dts from 'rollup-plugin-dts';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const globals = {
  vue: 'Vue',
  '@vue/composition-api': 'vueCompositionApi',
  '@vue/runtime-dom': 'Vue',
};

const name = 'VueUseThree';

export default [
  // scripts
  {
    input: `src/core/index.ts`,
    output: [
      {
        file: `dist/core/index.cjs.js`,
        format: 'cjs',
      },
      {
        file: `dist/core/index.esm.js`,
        format: 'es',
      },
      {
        file: `dist/core/index.umd.js`,
        format: 'umd',
        globals,
        name,
      },
      {
        file: `dist/core/index.umd.min.js`,
        format: 'umd',
        globals,
        name,
        plugins: [
          uglify(),
        ],
      },
    ],
    plugins: [
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        tsconfigOverride: {
          declaration: false,
          declarationDir: null,
          declarationMap: false,
        },
        useTsconfigDeclarationDir: true,
      }),
    ],
    external: [
      '@vue/composition-api',
      '@vue/runtime-dom',
      'vue',
    ],
  },

  // typings
  {
    input: `./typings/core/index.d.ts`,
    output: {
      file: `dist/core/index.d.ts`,
      format: 'es',
    },
    plugins: [
      dts(),
    ],
  },
];
