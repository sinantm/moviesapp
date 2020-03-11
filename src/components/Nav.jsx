import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Grid, Menu } from 'semantic-ui-react';
import { logoutUser } from '../actions/logout';
import firebase from '../firebase/config';

const Nav = props => {
  const loginSelector = useSelector(state => state.logIn);
  const signinSelector = useSelector(state => state.signIn);
  const [userState, setUserState] = useState(null);
  const dispatch = useDispatch();
  const logoutUserAction = () => dispatch(logoutUser());

  useEffect(() => {
    firebase.getUserState().then(user => {
      setUserState(user);
    });
  });

  const logout = async () => {
    setUserState(null);
    await logoutUserAction();
  };

  let Header;

  if (
    (loginSelector.user && loginSelector.user.hasOwnProperty('user')) ||
    (signinSelector.user && signinSelector.user.hasOwnProperty('user')) ||
    userState != null
  ) {
    Header = (
      <React.Fragment>
        <Menu stackable>
          <Menu.Item name="home" active={'home'}>
            <Link to="/">Anasayfa</Link>
          </Menu.Item>
          <Menu.Item name="messages">
            <Link to="/create">Yeni Film Ekle</Link>
          </Menu.Item>
          <Menu.Item position="right" name="sign-in" active={'sign-in'}>
            <Button onClick={logout} negative>
              Çıkış
            </Button>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  } else {
    Header = (
      <React.Fragment>
        <Menu stackable>
          <Menu.Item name="sign-in" active={'sign-in'}>
            <Link to="/signin">Üye Ol</Link>
          </Menu.Item>
          <Menu.Item name="sign-in" active={'sign-in'}>
            <Link to="/login">Oturum Aç</Link>
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }

  return (
    <Container>
      <Grid divided="vertically">
        <Grid.Row columns={1}>
          <Grid.Column>{Header}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default withRouter(Nav);
