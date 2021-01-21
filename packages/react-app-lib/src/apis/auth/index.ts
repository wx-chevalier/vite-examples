/** 用户鉴权相关操作 */
import { setAuthority } from '@m-fe/react-commons';
import _ from 'lodash';
import * as S from 'ufc-schema';

import { getToken, history, setToken } from '@/skeleton';

const getProfile = async () => {
  return new S.User();
};

/**
 * @start User Token 登陆接口
 */
export async function loginByUserToken() {
  await postLogin(getToken() || 'test-token');
}

/** 统一的登陆后处理 */
async function postLogin(token: string | null) {
  if (token) {
    setToken(token);

    // 这里获取用户信息，并且设置权限
    const profile = await getProfile();

    setGlobalUser(profile);

    if (!profile) {
      setToken(null);
      setAuthority(null);
      return;
    }

    // 获取到用户的权限信息
    const permissionNames = (profile.permissions || []).map((p: any) =>
      p.name.trim(),
    );

    // 注册权限信息
    const authority = [profile.authority, ...permissionNames];

    if (authority.indexOf('SYS_ADMIN') > -1) {
      authority.push('TENANT_ADMIN');
    }

    if (authority.indexOf('TENANT_ADMIN') > -1) {
      authority.push('TENANT_USER');
    }

    if (authority.indexOf('TENANT_ADMIN') > -1) {
      authority.push(...['PRODUCT_BOARD', 'MACHINE_BOARD']);
    }

    setAuthority(authority);
  } else {
    setToken(null);
    setAuthority(null);
  }
}

export async function setGlobalUser(profile: S.User) {
  if (profile) {
    window.gConfig.user = profile;

    if (window.Sentry) {
      window.Sentry.configureScope((scope: any) => {
        scope.setUser({ ...profile });
      });
    }
  }
}

export function getGlobalUser() {
  return window.gConfig.user;
}

export function logout() {
  setToken(null);
  setAuthority(null);
  window.gConfig.user = null;
  history.push('/auth/login');

  // 需要刷新界面，清空 redux
  window.location.reload();
}
