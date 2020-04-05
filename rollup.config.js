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
    input: `src/index.ts`,
    output: [
      {
        file: `dist/index.cjs.js`,
        format: 'cjs',
      },
      {
        file: `dist/index.esm.js`,
        format: 'es',
      },
      {
        file: `dist/index.umd.js`,
        format: 'umd',
        globals,
        name,
      },
      {
        file: `dist/index.umd.min.js`,
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
    input: `./typings/index.d.ts`,
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
    plugins: [
      dts(),
    ],
  },
];
