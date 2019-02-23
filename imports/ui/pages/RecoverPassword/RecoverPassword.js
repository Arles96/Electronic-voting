import React from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import NavBar from '../../components/Navbar/';

import './RecoverPassword.scss';

class RecoverPassword extends React.Component {

  constructor (props) {
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
    const email = e.target.email.value;
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }

  render () {
    return (
      <div id="recover-pwd-page" >
        <NavBar />
        <Container className="container-recover " >
          <Header textAlign="center" className="header-rpwd" >
            <h2>Restablecer tu contraseña</h2>
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
  }
}

export default RecoverPassword;
