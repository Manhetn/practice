import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from './pages';
import { Provider } from 'react-redux';
import store from './core/store/store';

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/login/:step">
            <LoginPage />
          </Route>
          <Redirect to="/login/step-1" />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
