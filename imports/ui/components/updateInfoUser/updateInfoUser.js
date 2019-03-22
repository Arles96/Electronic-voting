import React from 'react';
import { Card, Header, Form, Message,Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import UpdateProfileSchema from '../../../api/users/updateProfile';

class UpdateInfoUser extends React.Component {

 /* constructor() {
    
    this.handleSubmitProfile = this.handleSubmitProfile.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  }*/

  handleSubmitProfile (event) {
    const data = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      campus: event.target.campus.value
    };
    try {
      UpdateProfileSchema.validate(data);
      Meteor.call(`updateProfile`,data);
    } catch (error) {
      //this.setState({ errProfile: error.message });
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
    } catch (error) {
      //this.setState({ errProfile: error.message });
    }
  }
  render() {
    //const { errProfile } = this.state;
    return (
      <div>
        <Card>
          { /* Formulario para editar informacion de perfil */  }
          <Header as="h3" icon textAlign="center" >
            <Icon name="users" circular />
            Actualizar Información de Perfil
          </Header>
          <Form error onSubmit={this.handleSubmitProfile} >
            {/* errProfile && <Message error content={errProfile} /> */}
            <Form.Field>
              <label>Nombres</label>
              <input name="firstName" />
            </Form.Field>
            <Form.Field>
              <label>Apellidos</label>
              <input name="lastName" />
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
        <Card>
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