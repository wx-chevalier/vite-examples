import { Divider } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';

import { AppState } from '@/ducks';

import styles from './index.less';

export interface CustomerLoactionCount {
  date: string;
  location: string;
  lat: string;
  lng: string;
  tenants: string;
  printers: string;
  comments: string;
}

export interface CustomerMapProps extends RouteComponentProps {}

export interface CustomerMapState {
  globalStats?: {
    workOrderCnt: number;
    tenantCnt: number;
    userCnt: number;
    utkPrinterCnt: number;
  };
}

export class CustomerMapComp extends React.PureComponent<
  CustomerMapProps,
  CustomerMapState
> {
  constructor(props: CustomerMapProps) {
    super(props);

    this.state = { globalStats: {} as any };
  }

  render() {
    const { globalStats } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.item}>租户数：{globalStats.tenantCnt}</div>
          <Divider type="vertical" />
          <div className={styles.item}>设备数：{globalStats.utkPrinterCnt}</div>
          <Divider type="vertical" />
          <div className={styles.item}>用户数：{globalStats.userCnt}</div>
          <Divider type="vertical" />
          <div className={styles.item}>工单数：{globalStats.workOrderCnt}</div>
        </div>
      </div>
    );
  }
}

export const CustomerMap = connect(
  (_state: AppState) => ({}),
  {},
)(withRouter(CustomerMapComp));
