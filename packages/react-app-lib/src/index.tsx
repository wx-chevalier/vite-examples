import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import './skeleton/styles/reset.less';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConnectedRouter } from 'connected-react-router';
import dayjs from 'dayjs';
import zh from 'dayjs/locale/zh-cn';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isMoment from 'dayjs/plugin/isMoment';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import timeZone from 'dayjs-ext/plugin/timeZone';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import * as smoothscroll from 'smoothscroll-polyfill';

import { loginByUserToken } from './apis';
import App from './skeleton/containers/App';
import { history } from './skeleton/env/history';
import store from './skeleton/env/store';

smoothscroll.polyfill();

dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isMoment);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(timeZone);
dayjs.extend(utc);

dayjs.locale(zh);

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
  const _FinalApp = (
    <IntlProvider locale="en">
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </ConfigProvider>
    </IntlProvider>
  );

  // 如果使用了 LazyCompile 插件需要禁用该方式
  const FinalApp = __DEV__ ? hot(_FinalApp) : _FinalApp;

  ReactDOM.render(FinalApp, document.getElementById('root'));
});
