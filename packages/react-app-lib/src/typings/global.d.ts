import 'dayjs/plugin/relativeTime';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as S from 'ufc-schema';
import { Plugin } from 'webpack';

declare global {
  const __DEV__: boolean;

  interface Window {
    Sentry: any;
    System: SystemJSLoader.System;
    gConfig: {
      pwa?: false;
      user?: S.User;
      HOST?: string;
      UFI_HOST?: string;
      NODE_HOST?: string;
    };
  }
}
