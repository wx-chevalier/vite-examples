declare module 'dayjs/locale/zh-cn';
declare module 'dayjs/locale/en';
declare module 'rc-tween-one/lib/plugin/ChildrenPlugin';
declare module 'dayjs-ext/plugin/timeZone';
declare module 'react-hls-player';
declare module 'ant-design-pro/lib/Ellipsis';
declare module 'slash2';
declare module 'antd-theme-webpack-plugin';

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'react-copy-to-clipboard';
declare module 'react-fittext';
declare module '@antv/data-set';
declare module 'nzh/cn';
declare module 'webpack-theme-color-replacer';
declare module 'webpack-theme-color-replacer/client';
declare module 'redux-pack';

declare module '*.less' {
  const styles: Record<string, string>;
  export = styles;
}

declare module '*.svg' {
  import React from 'react';
  const Component: React.ComponentType;
  export = styles;
}

declare module 'html-webpack-harddisk-plugin' {
  import { Plugin } from 'webpack';

  class HtmlWebpackHarddiskPlugin extends Plugin {}

  export = HtmlWebpackHarddiskPlugin;
}

declare module 'html-webpack-inline-source-plugin' {
  import { Plugin } from 'webpack';

  class HtmlWebpackInlineSourcePlugin extends Plugin {}

  export = HtmlWebpackInlineSourcePlugin;
}

declare module 'lazy-compile-webpack-plugin' {
  import { Plugin } from 'webpack';

  namespace LazyCompileWebpackPlugin {
    interface Options {
      refreshAfterCompile?: boolean;
    }
  }

  class LazyCompileWebpackPlugin extends Plugin {
    constructor(options?: LazyCompileWebpackPlugin.Options);
  }

  export = LazyCompileWebpackPlugin;
}

declare module 'webpack-theme-color-replacer' {
  import { Plugin } from 'webpack';

  namespace ThemeColorReplacer {
    interface Options {
      fileName: string;
      matchColors: string[];
      changeSelector(selector: string): string;
    }
  }

  class ThemeColorReplacer extends Plugin {
    static varyColor: {
      lighten: (color: string, radio: number) => string;
      darken: (color: string, radio: number) => string;
    };

    constructor(options: ThemeColorReplacer.Options);
  }

  export = ThemeColorReplacer;
}

declare module 'webpack-theme-color-replacer/client' {
  namespace WebpackThemColorReplacerClient {
    interface ChangeColorOptions {
      newColors: string[];
      changeUrl(cssUrl: string): string;
    }
  }

  interface WebpackThemColorReplacerClient {
    varyColor: {
      lighten: (color: string, radio: number) => string;
      darken: (color: string, radio: number) => string;
    };
    changer: {
      changeColor(
        options: WebpackThemColorReplacerClient.ChangeColorOptions,
        PromiseConstructor: typeof Promise,
      ): Promise<void>;
    };
  }

  const client: WebpackThemColorReplacerClient;

  export = client;
}

declare module 'html-webpack-plugin' {
  namespace HtmlWebpackPlugin {
    interface Options {
      alwaysWriteToDisk?: boolean;
      inlineSource?: string | RegExp;
    }
  }

  export = HtmlWebpackPlugin;
}
