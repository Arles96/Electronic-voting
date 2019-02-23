import React from 'react';
import { Header, Form, Icon, Message, Input } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import ButtonLoadingInverted from '../../components/ButtonLoadingInverted/ButtonLoadingInverted';

import './RecoverPassword.scss';

class RecoverPassword extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      err: '',
      success: '',
      loading: false
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
    this.setState({ loading: true });
    const email = e.target.email.value;
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        console.log(err)
        this.setState({ err: 'Este correo no existe', success: '' });
      } else {
        this.setState({ success: 'Se ha enviado el correo exitosamente.', err: '' });
      }
      this.setState({ loading: false });
    })
  }

  render () {
    const { loading, err, success } = this.state;
    return (
      <div id="recover-pwd-page" >
        <div className="container-recover " >
          <Header icon textAlign="center" className="header-rpwd" >
            <Icon name="mail" />
            <h2>Restablecer tu contraseña</h2>
          </Header>
          {err && <Message error content={err} />}
          {success && <Message success content={success} />}
          <Form onSubmit={this.handleSubmit} >
            <Form.Field>
              <label>Correo:</label>
              <Input iconPosition="left">
                <Icon name="at" />
                <input type="email" name="email" />
              </Input>
            </Form.Field>
            <Form.Field className="text-center" >
              <ButtonLoadingInverted
                className="btn-recover"
                text="Enviar"
                loading={loading}
                color="green"
              />
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

export default RecoverPassword;
