import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import './skeleton/styles/reset.less';

import { setAuthorityKey } from '@m-fe/react-commons';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import dayjs from 'dayjs';
import zh from 'dayjs/locale/zh-cn';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import * as smoothscroll from 'smoothscroll-polyfill';

import { loginByUserToken } from './apis';
import { RootApp } from './apps';
import { defaultStore, history } from './skeleton';

smoothscroll.polyfill();

dayjs.locale(zh);

setAuthorityKey('@m-fe/app-lib:authorityKey');

if (!window.gConfig) {
  window.gConfig = {};
}

if (__DEV__) {
  const _warn = console.warn;
  console.warn = (message: unknown, ...args: unknown[]) => {
    // skip react warnings on development, they should only come from third party components
    if (
      typeof message === 'string' &&
      message.includes('https://fb.me/react-unsafe-component-lifecycles')
    ) {
      return;
    }
    _warn(message, ...args);
  };
}

if (!__DEV__ && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js');
}

if ('addEventListener' in document && 'FastClick' in window) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      // tslint:disable-next-line: no-string-literal
      window['FastClick'].attach(document.body);
    },
    false,
  );
}

loginByUserToken().then(() => {
  ReactDOM.render(
    <IntlProvider locale="en">
      <ConfigProvider locale={zhCN}>
        <Provider store={defaultStore}>
          <ConnectedRouter history={history}>
            <RootApp />
          </ConnectedRouter>
        </Provider>
      </ConfigProvider>
    </IntlProvider>,
    document.getElementById('root'),
  );
});
