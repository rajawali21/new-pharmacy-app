import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Other Component
import Login from './pages/login/login';
import Register from './pages/register/register';
import OfficerHome from './pages/officerhome/officerhome';
import OfficerRequest from './pages/officerrequest/officerrequest';


function App() {
  return (
    <div>

      <Switch>
        <Route exact path='/officerhome' component={OfficerHome} />
        <Route exact path='/officerrequest' component={OfficerRequest} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Login} />
      </Switch>

    </div>
  );
}

export default App;
