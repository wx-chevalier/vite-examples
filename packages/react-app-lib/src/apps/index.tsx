import {
  Exception403,
  Exception404,
  LoadableContainer,
  Module,
} from '@m-fe/react-commons';
import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import { LoginPage } from '@/apps/auth/containers/LoginPage';
import { CustomerMap } from '@/apps/vis/containers/CustomerMap';
import { defaultStore } from '@/skeleton/env/redux_store';

import { getMenus } from '../manifest';
import { NavLayout } from './shared/layouts/NavLayout';

export interface IAppProps {}

export interface IAppState {}

export class RootAppComp extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  renderRoute(appId: string, app: Module) {
    if (app.component) {
      return <Route key={appId} path={`/${appId}`} component={app.component} />;
    }

    if (!app.loader || typeof app.loader !== 'function') {
      throw new Error(`${appId} loader is not defined or defined wrongly`);
    }

    return (
      <Route
        key={appId}
        path={`/${appId}`}
        component={() => (
          <LoadableContainer
            appId={appId}
            appLoader={app.loader!}
            onAppendReducer={defaultStore.appendReducer}
          />
        )}
      />
    );
  }

  render() {
    const rootMenu = getMenus();

    if (!rootMenu) {
      return (
        <Switch>
          <Route exact={true} path="/">
            <Redirect to={`/auth/login`} />
          </Route>
          <Route exact={true} path={`/auth/login`} component={LoginPage} />
          <Route path="/403" component={() => <Exception403 />} />
          <Route component={() => <Exception404 />} />
        </Switch>
      );
    }

    return (
      <NavLayout matchedPath={location.pathname} disableContentMargin={false}>
        <Switch>
          <Route
            exact={true}
            path={`/vis/customer-map`}
            component={CustomerMap}
          />

          <Redirect to={`/vis/customer-map`} />
        </Switch>
      </NavLayout>
    );
  }
}

export const RootApp = connect(_state => ({}), {})(RootAppComp);
