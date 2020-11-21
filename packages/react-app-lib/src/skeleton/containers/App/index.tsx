import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';

import { LoginPage } from '@/apps/auth/containers/LoginPage';
import { CustomerMap } from '@/apps/vis/containers/CustomerMap';
import { Exception403, Exception404 } from '@/skeleton';
import store from '@/skeleton/env/store';

import { Module, getMenus } from '../../../manifest';
import { NavLayout } from '../../layouts/NavLayout';
import AppContainer from '../AppContainer';

export interface IAppProps extends RouteComponentProps {}

export interface IAppState {}

export class App extends React.Component<IAppProps, IAppState> {
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
          <AppContainer
            appId={appId}
            appLoader={app.loader!}
            onAppendReducer={store.appendReducer}
          />
        )}
      />
    );
  }

  render() {
    const { location } = this.props;
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

export default connect(_state => ({}), {})(withRouter(App));
