import React from 'react';
import { Header, Form, Button, Message, Icon } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import resetPasswordSchema from '../../../api/users/resetPassword';

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
    const doc = {
      password: e.target.password.value,
      passwordAgain: e.target.passwordAgain.value
    };
    try {
      resetPasswordSchema.validate(doc);
      const { token } = this.props.match.params;
      Accounts.resetPassword(token, password, (err) => {
        if (err) {
          this.setState({ err: err.reason });
        }
      });
    } catch (error) {
      this.setState({ err: error.message });
    }
  }

  render () {
    const { err } = this.state;
    return (
      <div id="reset-password-page">
        <div className="container-reset" >
          <a href='/login' id="returnLogin" >
            <Icon name="arrow left" />
          </a>
          <Header as="h2" icon textAlign="center">
            <Icon name="settings" />
            Recuperar contraseña
          </Header>
          {err && <Message error content={err} />}
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
        </div>
    </div>
    );
  }
}

export default RecoverPassword;
