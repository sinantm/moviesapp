import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './components/auth/auth';
import Create from './components/Create';
import Login from './components/Login';
import Main from './components/Main';
import Post from './components/Post';
import Signin from './components/Signin';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/create" component={Auth(Create)} />
    </Switch>
  );
};

export default Routes;

// const mapStateToProps = (state, ownProps = {}) => {
//   console.log('state:', state);
// };

// export default connect(mapStateToProps)(Routes);
