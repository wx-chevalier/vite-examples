import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
import {
  checkPermissions,
  getAuthority,
  setAuthority,
} from '@m-fe/react-commons';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import cn from 'classnames';
import * as React from 'react';

import BlueLogo from '@/assets/logo_blue.svg';
import ULogo from '@/assets/logo_u.svg';
import { getMenus } from '@/manifest';
import { formatMessage, history } from '@/skeleton';

import { ColoredLabel } from '../../components/Label';
import { RightContent } from '../RightContent';
import styles from './index.less';
import { NavContext } from './NavContext';

export interface NavLayoutProps extends ProLayoutProps {
  matchedPath?: string;
}

/**
 * use AuthorizedWrapper check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return checkPermissions(item.authority, localItem, null) as MenuDataItem;
  });

const footerRender: NavLayoutProps['footerRender'] = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: '45vw',
        fontSize: 10,
      }}
    >
      <div>© 2019-2020 XXX 版权所有ICP 证：</div>
      <a href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action">
        XXXXXXX
      </a>
    </div>
  );
};

export const NavLayout: React.FC<NavLayoutProps> = props => {
  const { children, matchedPath } = props;
  const [authority, _setAuthority] = React.useState(getAuthority());

  const [isCollapsed, toggleCollapse] = React.useState(true);

  const handleMenuCollapse = (payload: boolean): void => {
    toggleCollapse(payload);
  };

  const defaultRenderCollapsedButton = (collapsed?: boolean) =>
    collapsed ? (
      <MenuUnfoldOutlined
        size={24}
        style={{ fontSize: 18 }}
        onClick={() => {
          toggleCollapse(!collapsed);
        }}
      />
    ) : (
      <MenuFoldOutlined
        size={24}
        style={{ fontSize: 18 }}
        onClick={() => {
          toggleCollapse(!collapsed);
        }}
      />
    );

  const renderHeaderNav = () => {
    const indicator = (
      <>
        <ColoredLabel
          style={{ marginLeft: 8, fontSize: 16, cursor: 'pointer' }}
        >
          <Ellipsis tooltip={false} length={25}>
            React App Lib
          </Ellipsis>
        </ColoredLabel>
      </>
    );

    return (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        <span>{defaultRenderCollapsedButton(isCollapsed)}</span>
        {indicator}
      </span>
    );
  };

  const routes = getMenus();
  // 收缩状态下，必须具备二级菜单
  const collapsedRoutes = [...routes].map(r => {
    if (!r.children) {
      return {
        ...r,
        children: [{ ...r, icon: undefined }],
      };
    }

    return r;
  });

  return (
    <NavContext.Provider
      value={{
        authority: authority,
        onAuthorityChange: (a: string[]) => {
          setAuthority(a);
          _setAuthority(a);
        },
      }}
    >
      <ProLayout
        {...props}
        collapsed={isCollapsed}
        logo={
          isCollapsed ? (
            <ULogo style={{ width: 26, height: 32 }} />
          ) : (
            <BlueLogo style={{ width: 150, height: 50 }} />
          )
        }
        route={{
          name: 'Root',
          routes: isCollapsed ? collapsedRoutes : routes,
        }}
        title="React App Lib"
        siderWidth={200}
        navTheme="dark"
        menuDataRender={menuDataRender}
        menuItemRender={menuItemProps => {
          const defaultDom = menuItemProps.icon ? (
            <span>
              <span>{menuItemProps.icon}</span>
              {menuItemProps.name}
            </span>
          ) : (
            menuItemProps.name
          );

          if (menuItemProps.isUrl) {
            return (
              <div className={cn(styles.menuItem)} id={menuItemProps.key}>
                {defaultDom}
              </div>
            );
          }

          // 判断是否选中
          if ((matchedPath || '').startsWith(menuItemProps.path)) {
            return (
              <div className={cn(styles.selectedMenu, styles.menuItem)}>
                {defaultDom}
              </div>
            );
          }

          return (
            <span>
              <div
                className={styles.menuItem}
                onClick={() => {
                  history.push(menuItemProps.path);
                }}
              >
                {defaultDom}
              </div>
            </span>
          );
        }}
        openAnimation={() => {}}
        collapsedButtonRender={false}
        footerRender={footerRender}
        formatMessage={formatMessage}
        headerContentRender={renderHeaderNav}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        onCollapse={handleMenuCollapse}
      >
        {children}
      </ProLayout>
    </NavContext.Provider>
  );
};
