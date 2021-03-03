import { FundOutlined, UserOutlined } from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-layout';
import * as React from 'react';

import { getGlobalUser } from '@/apis';

export const getMenus: () => MenuDataItem[] = () => {
  const profile = getGlobalUser();

  if (!profile) {
    return;
  }

  const iconStyle: React.CSSProperties = {
    color: 'white',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    fontSize: 20,
  };

  const routes = [
    {
      path: `/vis`,
      name: '数据大屏',
      icon: <FundOutlined style={iconStyle} />,
      children: [
        { path: `/vis/customer-map`, name: '客户地图' },
        { path: `/vis/customer-personas`, name: '客户画像' },
        { path: `/vis/user-growth`, name: '用户增长' },
        { path: `/vis/productivity-stats`, name: '产效分析' },
      ],
    },
    {
      path: `/user`,
      name: '用户管理',
      icon: <UserOutlined style={iconStyle} />,
      children: [
        {
          path: `/user/list`,
          name: '用户列表',
          children: [
            { path: `/user/list`, name: '用户列表' },
            { path: `/user/role`, name: '角色管理' },
          ],
        },
        { path: `/user/role`, name: '角色管理' },
      ],
    },
    {
      path: `/first-menu`,
      name: '一级目录',
      icon: <UserOutlined style={iconStyle} />,
    },
  ];

  return routes;
};
