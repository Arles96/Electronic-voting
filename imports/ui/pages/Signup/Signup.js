import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import { Form, Button, Container, Header, Icon, Message } from 'semantic-ui-react';


// import styles
import './Signup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: ''
    }
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

  handleSubmit(e) {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.firstName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName
      }
    }, (err) => {
      if (err) {
        this.setState({
          err: err.reason
        });
      }
    });
  }

  render() {
    if (this.props.loggedIn) {
      return null;
    }
    const { err } = this.state;
    return (
      <div id="signupPage" >
        <Navbar/>
        <Container className="padding-top" >
          <Header as="h2" icon textAlign="center" >
            <Icon name="users" circular />
            Registrarse
          </Header>
          <Form error onSubmit={this.handleSubmit} >
            { err && <Message error content={err} /> }
            <Form.Field >
              <label>Nombres</label>
              <input name="firstName" />
            </Form.Field>
            <Form.Field>
              <label>Apellidos</label>
              <input name="lastName" />
            </Form.Field>
            <Form.Field>
              <label>Correo</label>
              <input name="email" type="email" />
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <input name="password" type="password" />
            </Form.Field>
            <div className="text-center" >
              <Button className="btn-signup" inverted color='green'>
                Registrarse
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

Signup.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
