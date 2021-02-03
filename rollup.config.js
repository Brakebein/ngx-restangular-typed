import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  external: [
    'ngx-restangular',
    'rxjs'
  ],
  input: 'src/index.ts',
  plugins: [
    nodeResolve(),
    typescript()
  ],
  output: [
    {
      file: 'dist/build.js',
      format: 'es'
    }
  ]
};
