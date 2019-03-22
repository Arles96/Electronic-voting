
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Header, Icon, Button, Message } from 'semantic-ui-react';

// import styles
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
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

  handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({ err: 'Correo o contraseña incorrectas.' });
      }
    });
  }

  render() {
    if (this.props.loggedIn) {
      return null;
    }
    const { err } = this.state;
    return (
      <div id="loginSection">
        <div className="container-login">
          <a href='/' id="returnLogin" >
            <Icon name="arrow left" />
          </a>
          <Header as="h2" icon textAlign="center" >
            <Icon name="user" circular />
            Iniciar Sesión
          </Header>
          <Form error onSubmit={this.handleSubmit} >
            { err && <Message error content={err} /> }
            <Form.Field>
              <label>Correo</label>
              <input type="email" name="email" /> 
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <input type="password" name="password" />
            </Form.Field>
            <div style={{ marginBottom: '1rem' }} >
              <NavLink to='/recover-password' >¿Olvidaste tu contraseña?</NavLink>
            </div>
            <div className="text-center" >
              <Button inverted color="blue" className="btn-signin">Iniciar Sesión</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
