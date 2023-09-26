import type { UserConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

export default (): UserConfig => {
  return {
    plugins: [react()],
    base: '/',
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import "./src/assets/scss/_mixin.scss";`
    //     }
    //   }
    // },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    assetsInclude: ['**/*.svgx']
  };
};
