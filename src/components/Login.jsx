import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { loginUser } from '../actions/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const loginUserAction = (email, password) => dispatch(loginUser(email, password));

  const login = async e => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      let user = await loginUserAction(email, password);
      if (user) {
        setRedirect(true);
      }
    } else {
      console.log('Kimlik Bilgilerini Doldurmanız Gerekiyor');
    }
  };

  const redirecTo = redirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Hesabınıza giriş yapın
          </Header>
          <Form onSubmit={login} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
              />

              <Button color="teal" fluid size="large">
                Giriş
              </Button>
            </Segment>
          </Form>
          <Message>
            Üye değilmisiniz? <Link to="/signin">Hemen Üye Ol</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
