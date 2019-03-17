import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Header, Icon, Message, Input } from 'semantic-ui-react';
import RegisterSchema from '../../../api/users/registerUser';

// import styles
import './Signup.scss';

const emailUnitec = '@unitec.edu';

const campus = [
  {
    key: 'Unitec TGU',
    value: 'Unitec TGU',
    text: 'Unitec TGU'
  },
  {
    key: 'Unitec SPA',
    value: 'Unitec SPA',
    text: 'Unitec SPA'
  }
];

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
    const doc = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: `${e.target.email.value}${emailUnitec}`,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      campus: e.target.campus.value
    };
    try {
      RegisterSchema.validate(doc)
      Accounts.createUser({
        email: doc.email,
        password: doc.password,
        profile: {
          firstName: doc.firstName,
          lastName: doc.lastName,
          campus: doc.campus
        }
      }, (err) => {
        if (err) {
          this.setState({
            err: 'El correo ya existe.'
          });
        }
      });
    } catch (error) {
      console.log(error);
      this.setState({ err: error.message });
    }
  }

  render() {
    if (this.props.loggedIn) {
      return null;
    }
    const { err } = this.state;
    return (
      <div id="signupPage" >
        <div className="container-signup" >
          <a href='/' id="returnLogin" >
            <Icon name="arrow left" />
          </a>
          <Header as="h3" icon textAlign="center" >
            <Icon name="users" circular />
            Registrarse
          </Header>
          <Form error onSubmit={this.handleSubmit} >
            { err && <Message error content={err} /> }
            <Form.Group widths="equal" >
              <Form.Input fluid label='Nombres'name='firstName' />
              <Form.Input fluid label='Apellidos'name='lastName' />
            </Form.Group>
            <Form.Field>
              <label>Correo</label>
              <Input name="email" label={{ basic: true, content: emailUnitec }} labelPosition="right"  />
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <input name="password" type="password" />
            </Form.Field>
            <Form.Field>
              <label>Confirmar Contraseña</label>
              <input name="confirmPassword" type="password" />
            </Form.Field>
            <Form.Field>
              <label>Campus</label>
              <select name="campus" >
                {
                  campus.map(({key, value, text}) => <option key={key} value={value} >{text}</option>)
                }
              </select>
            </Form.Field>
            <div className="text-center" >
              <Button className="btn-signup" inverted color='green'>
                Registrarse
              </Button>
            </div>
          </Form>
        </div>
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
