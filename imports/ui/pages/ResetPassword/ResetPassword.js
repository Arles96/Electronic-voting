import React from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import NavBar from '../../components/Navbar/';

import './ResetPassword.scss';

class RecoverPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      err: ''
    };
    console.log(this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    const password = e.target.password.value;
    const passwordAgain = e.target.passwordAgain.value;
    if (password === passwordAgain) {
      Accounts.resetPassword('', password, (err) => {
        if (err) {
          this.setState({ err: err.reason });
        }
      });
    } else {
      this.setState({ err: 'Contraseñas no coinciden.' })
    }
  }

  render () {
    return (
      <div className="recover-password-page">
        <NavBar />
          <Container>
            <Header textAlign="center" className="header-rpwd" >
              Recuperar contraseña
            </Header>
            <Form onSubmit={this.handleSubmit} >
              <Form.Field>
                <label>Contraseña:</label>
                <input type="password" name="password" />
              </Form.Field>
              <Form.Field>
                <label>Confirmar Contraseña:</label>
                <input type="password" name="passwordAgain" />
              </Form.Field>
              <Form.Field className="text-center" >
                <Button className="btn-recover" inverted color="green" >Enviar</Button>
              </Form.Field>
            </Form>
          </Container>
    </div>
    );
  }
}

export default RecoverPassword;
