import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { createUser } from '../actions/signin';

const Singnin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [routeRedirect, serRedirect] = useState(false);
  const dispatch = useDispatch();
  const createUserAction = (email, password) => dispatch(createUser(email, password));

  const signin = async e => {
    e.preventDefault();
    //console.log('user created');
    if (email !== '' && password !== '') {
      await createUserAction(email, password);
    } else {
      console.log('Kimlik Bilgilerini Doldurmanız Gerekiyor');
    }
  };

  const redirecTo = routeRedirect;
  if (redirecTo) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Üye Bilgileri
          </Header>
          <Form onSubmit={signin} size="large">
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
                Üye ol
              </Button>
            </Segment>
          </Form>
          <Message>
            Zaten Üyeyim? <Link to="/login">Giriş</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default Singnin;
