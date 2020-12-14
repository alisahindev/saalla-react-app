import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { routes } from './routes';
import MainLayout from './components/mainLayout';
import Loader from './components/Loader';
import { history } from '.';

function withLayout(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <MainLayout>
        <WrappedComponent></WrappedComponent>
      </MainLayout>
    }
  };
}

function App() {
  return (
    <React.Fragment>
      <ConnectedRouter history={history} >
        <React.Suspense fallback={<Loader />}>
          <Switch>
            {routes.map((item, index) => <Route key={index} exact={item.exact} path={item.path} component={withLayout(item.component)} />)}
          </Switch>
        </React.Suspense>
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
