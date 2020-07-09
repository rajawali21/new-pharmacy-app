import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Other Component
import Login from './pages/login/login';
import Register from './pages/register/register';


function App() {
  return (
    <div>

      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>

    </div>
  );
}

export default App;
