import { Button } from 'antd';
import cn from 'classnames';
import React from 'react';

import { history } from '@/skeleton';

import styles from './index.less';

export interface LoginPageProps {
  className?: string;
  style?: Record<string, string | number>;
}

export const LoginPage = ({ className, style }: LoginPageProps) => {
  return (
    <div className={cn(className, styles.container)} style={style}>
      LoginPage
      <Button
        onClick={() => {
          history.push('/');
        }}
      >
        登录
      </Button>
    </div>
  );
};
