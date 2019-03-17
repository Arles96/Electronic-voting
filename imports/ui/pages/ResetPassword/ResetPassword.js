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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      return this.props.history.push('/profile');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      nextProps.history.push('/profile');
      return false;
    }
    return true;
  }

  handleSubmit (e) {
    e.preventDefault();
    const password = e.target.password.value;
    const passwordAgain = e.target.passwordAgain.value;
    if (password === passwordAgain) {
      const { token } = this.props.match.params;
      Accounts.resetPassword(token, password, (err) => {
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
      <div id="reset-password-page">
        <NavBar />
          <Container>
            <Header textAlign="center" className="header-reset" >
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
                <Button className="btn-reset" inverted color="green" >Enviar</Button>
              </Form.Field>
            </Form>
          </Container>
    </div>
    );
  }
}

export default RecoverPassword;
