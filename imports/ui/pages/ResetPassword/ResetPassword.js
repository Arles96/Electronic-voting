import React from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import NavBar from '../../components/Navbar/';

import './ResetPassword.scss';

const RecoverPassword = () => (
  <div className="recover-password-page">
    <NavBar />
      <Container>
        <Header textAlign="center" className="header-rpwd" >
          Restablecer tu contraseña
        </Header>
        <Form onSubmit={this.handleSubmit} >
          <Form.Field>
            <label>Correo:</label>
            <input type="email" name="email" />
          </Form.Field>
          <Form.Field className="text-center" >
            <Button className="btn-recover" inverted color="green" >Enviar</Button>
          </Form.Field>
        </Form>
      </Container>
  </div>
);

export default RecoverPassword;
