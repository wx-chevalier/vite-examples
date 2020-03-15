import { MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';
import { ComponentType } from 'react';

import { getGlobalUser } from '@/apis';

export interface ResolvedModule {
  default: ComponentType<any>;
  reducer?: object;
}

export interface Module {
  type: 'page' | 'module' | 'app' | 'widget' | 'extension';
  component?: React.ComponentType;
  loader?: () => Promise<ResolvedModule>;
}

export const getMenus: () => MenuDataItem[] = () => {
  const profile = getGlobalUser();

  if (!profile || !profile.id) {
    return;
  }

  const routes = [
    {
      path: `/vis`,
      name: '数据大屏',
      icon: 'fund',
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
      icon: 'user',
      children: [
        { path: `/user/list`, name: '用户列表' },
        { path: `/user/role`, name: '角色管理' },
      ],
    },
  ];

  return routes;
};
