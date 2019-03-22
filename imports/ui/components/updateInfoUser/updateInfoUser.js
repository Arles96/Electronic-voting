import React from 'react';
import { Card, Header, Form, Message, Icon, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import UpdateProfileSchema from '../../../api/users/updateProfile';
import Swal from 'sweetalert2';

import './updateInfoUser.scss';

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

class UpdateInfoUser extends React.Component {

 /* constructor() {
    this.state = {
      errProfile: '',
      errPass: ''
    }
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  } */

  handleSubmitProfile (event) {
    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      campus: event.target.campus.value
    };
    try {
      UpdateProfileSchema.validate(data);
      Meteor.call(`updateProfile`,data);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Se ha actualizado'
      })
    } catch (error) {
      //this.setState({ errProfile: error.message });
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: error.message
      })
    }
  }
  handleSubmitPassword (event) {
    const data = {
      beforepassword: event.target.beforepassword.value,
      password: event.targetpassword.value,
      passwordAgain: event.target.passwordAgain.value
    };
    try {
      UpdatePasswordSchema.validate(data);
      Meteor.call(`updatePassword`,data);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Se ha actualizado'
      })
    } catch (error) {
      //this.setState({ errProfile: error.message });
      Swal.fire({
        position: 'top-end',
        type: 'error',
        title: error.message
      })
    }
  }

  render() {
    //const { errProfile } = this.state;
    const { user } = this.props;
    return (
      <div id="settingsCard" >
        <Card className="card-info" >
          { /* Formulario para editar informacion de perfil */  }
          <Header as="h3" icon textAlign="center" >
            <Icon name="users" circular />
            Actualizar Información de Perfil
          </Header>
          <Form error onSubmit={this.handleSubmitProfile} >
            {/* errProfile && <Message error content={errProfile} /> */}
            <Form.Field>
              <label>Nombres</label>
              <input name="firstName" defaultValue={ user && user.profile.firstName } />
            </Form.Field>
            <Form.Field>
              <label>Apellidos</label>
              <input name="lastName" defaultValue={ user && user.profile.lastName } />
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
                Actualizar
              </Button>
            </div>
          </Form>
        </Card>
        <Card className="card-info" >
          { /* Formulario para editar informacion de perfil */  }
          <Header as="h3" icon textAlign="center" >
            <Icon name="users" circular />
            Cambiar Contraseña
          </Header>
          <Form error onSubmit={this.handleSubmitPassword} >
            {/*errProfile && <Message error content={errProfile} /> */}
            <Form.Field>
              <label>Anterior Contraseña</label>
              <input name="beforepassword" />
            </Form.Field>
            <Form.Field>
              <label>Contraseña nueva</label>
              <input name="password" />
            </Form.Field>
            <Form.Field>
              <label>Confirmar Contraseña</label>
              <input name="passwordAgain" />
            </Form.Field>
            <div className="text-center" >
              <Button className="btn-signup" inverted color='green'>
                Actualizar
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    )
  }

}

export default UpdateInfoUser;