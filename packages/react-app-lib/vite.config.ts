import { genConfig } from '@m-fe/vite-config';
import { UserConfig } from 'vite';

const baseConfigs: UserConfig = genConfig(__dirname) as UserConfig;

const fileRegex = /\.(less)$/;

function transformLessImportPlugin() {
  return {
    name: 'transform-less-import-plugin',

    transform(src, id) {
      if (fileRegex.test(id)) {
        const code = src
          .replace("@import '~", "@import '")
          .replace("@import (reference) '~", "@import (reference) '");

        return {
          code,
          map: null, // provide source map if available
        };
      }
    },
  };
}

baseConfigs.css = {};
baseConfigs.css.preprocessorOptions = {
  less: { javascriptEnabled: true, js: true },
};
baseConfigs.plugins.unshift(transformLessImportPlugin());

export default baseConfigs;
