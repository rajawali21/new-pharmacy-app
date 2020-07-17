import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// Library
import { auth, createOfficer } from './firebase/firebase';
import { setCurrentUser } from './redux/user/user.action';
import { connect } from 'react-redux';

// Other Component
import Login from './pages/login/login';
import Register from './pages/register/register';
import OfficerHome from './pages/officerhome/officerhome';
import OfficerRequest from './pages/officerrequest/officerrequest';
import RolesChecking from './pages/roleschecking/roleschecking';
import DistributorHome from './pages/distributorhome/distributorhome';
import UserSetting from './pages/usersetting/usersetting';
import Distribution from './pages/distribution/distribution';
import AdminHome from './pages/adminhome/adminhome';
import ListAdmin from './pages/listadmin/listadmin';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, currentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createOfficer(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })

        if (currentUser) {
          if (currentUser.isOfficer) {
            console.log(currentUser.isOfficer)
            this.props.history.push('/officerhome')
          }
        }

      }
      else {
        setCurrentUser(userAuth)
      }
    })
  }

  render() {

    const { currentUser } = this.props;

    return (
      <div>
        <Switch>

          <Route exact path='/listadmin' render={
            (props) => currentUser && <ListAdmin {...props} />
          } />
          <Route exact path='/adminhome' render={
            (props) => currentUser && <AdminHome {...props} />
          } />
          <Route exact path='/distribution' render={
            (props) => currentUser && <Distribution {...props} />
          } />
          <Route exact path='/distributorhome' render={
            (props) => currentUser && <DistributorHome {...props} />
          } />
          <Route exact path='/officerhome' render={
            (props) => currentUser && <OfficerHome {...props} />
          } />
          <Route exact path='/officerrequest' render={
            (props) => currentUser && <OfficerRequest {...props} />
          } />
          <Route exact path='/usersetting' render={
            (props) => currentUser && <UserSetting {...props} />
          } />
          <Route exact path='/roleschecking' component={RolesChecking} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/' render={
            () => currentUser ? (<Redirect to='/roleschecking' />) : <Login />
          } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
