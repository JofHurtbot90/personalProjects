import React, {Component} from 'react';
import Navbar from './Navbar';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute';
import {verify} from './redux/actions/index';

import SignUpContainer from './routes/signup/SignUpFormContainer';
import LoginContainer from './routes/login/LoginFormContainer';
import CollectionsContainer from './routes/collections/CollectionsFormContainer';

class App extends Component{
  render(){
    isAuthenticated = this.props.isAuthenticated;
    return(
      <div className='app-content'>
        <Navbar/>
      <Switch>
        <Route exact path='/' render={(props)=>{
            return isAuthenticated ?
            <Redirect to='/profile'/> :
          <SignUpContainer {...props}/>
          }}/>
        <Route path='/login' render={(props)=>{
            return isAuthenticated ?
            <Redirect to='/profile'/> :
            <LoginContainer {...props}/>
          }}/>
        <ProtectedRoute path='/collections' component{CollectionsContainer}/>
        <ProtectedRoute path='/profile' component={Profile}/>
      </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state;
}

componentDidMount(){
  this.props.verify()
}

export default withRouter(connect(mapStateToProps, {verify})(App));
