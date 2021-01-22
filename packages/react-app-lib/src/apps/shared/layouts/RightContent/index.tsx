import { QuestionCircleOutlined } from '@ant-design/icons';
import { LangSelector } from '@m-fe/react-commons';
import { Tooltip } from 'antd';
import * as React from 'react';

import { getGlobalUser } from '@/apis';
import { formatMessage, getLocale, setLocale } from '@/skeleton';

import { HeaderSearch } from '../HeaderSearch';
import { NoticeIconView } from '../NoticeIconView';
import { UserDropdown } from '../UserDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';
export interface RightContentProps {
  theme?: SiderTheme;
  layout?: 'top' | 'side' | 'mix';
}

export const RightContent: React.SFC<RightContentProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        dataSource={[
          formatMessage({
            id: 'component.globalHeader.search.example1',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example2',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example3',
          }),
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
      />
      <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView />
      <UserDropdown
        currentUser={{
          name: getGlobalUser().nickname,
          avatar: 'https://i.pravatar.cc/300',
        }}
      />
      <LangSelector
        className={styles.action}
        selectedLang={getLocale()}
        onLangSelect={key => setLocale(key, false)}
      />
    </div>
  );
};
