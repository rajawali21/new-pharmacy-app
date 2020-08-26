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
import OfficerMedicine from './pages/officermedicine/officermedicine';
import RolesChecking from './pages/roleschecking/roleschecking';
import DistributorHome from './pages/distributorhome/distributorhome';
import UserSetting from './pages/usersetting/usersetting';
import Distribution from './pages/distribution/distribution';
import AdminHome from './pages/adminhome/adminhome';
import ListAdmin from './pages/listadmin/listadmin';
import ListOfficer from './pages/listofficer/listofficer';
import ListDistributor from './pages/listdistributor/listdistributor';
import Listrequest from './pages/listrequest/listrequest';
import ListDistribution from './pages/listdistribution/listdistribution';
import ListMedicine from './pages/listmedicine/listmedicine';
import ListDepartment from './pages/listdepartment/listdepartment';
import EditOfficerData from './pages/editofficerdata/editofficerdata';
import { SnackbarProvider } from 'notistack';
import OfficerRequestPrint from './pages/officerrequestprint/officerrequestprint';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('Did Mount');
      if (userAuth) {
        const userRef = await createOfficer(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
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
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Switch>


            <Route exact path='/listmedicine' render={
              (props) => currentUser && <ListMedicine {...props} />
            } />
            <Route exact path='/listdepartment' render={
              (props) => currentUser && <ListDepartment {...props} />
            } />
            <Route exact path='/listdistribution' render={
              (props) => currentUser && <ListDistribution {...props} />
            } />
            <Route exact path='/listrequest' render={
              (props) => currentUser && <Listrequest {...props} />
            } />
            <Route exact path='/listdistributor' render={
              (props) => currentUser && <ListDistributor {...props} />
            } />
            <Route exact path='/listofficer' render={
              (props) => currentUser && <ListOfficer {...props} />
            } />
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
            <Route exact path='/OfficerRequestPrint/:reqId' render={
              (props) => currentUser && <OfficerRequestPrint {...props} />
            } />
            <Route exact path='/officerrequest' render={
              (props) => currentUser && <OfficerRequest {...props} />
            } />
            <Route exact path='/officermedicine' render={
              (props) => currentUser && <OfficerMedicine {...props} />
            } />
            <Route exact path='/usersetting' render={
              (props) => currentUser && <UserSetting {...props} />
            } />
            <Route exact path='/editofficerdata' render={
              (props) => currentUser && <EditOfficerData {...props} />
            } />
            <Route exact path='/roleschecking' component={RolesChecking} />
            <Route exact path='/register' render={
              () => currentUser ? (<Redirect to='/roleschecking' />) : <Register />
            } />
            <Route exact path='/' render={
              () => currentUser ? (<Redirect to='/roleschecking' />) : <Login />
            } />
          </Switch>
        </SnackbarProvider>
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
