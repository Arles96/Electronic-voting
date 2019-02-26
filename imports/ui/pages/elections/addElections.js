import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Input, Form, Label, TextArea } from 'semantic-ui-react';

import Navbar from '../../components/Navbar/Navbar';

import './Elections.scss';

class addElections extends React.Component {
  constructor(props) {
    super(props);
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

    var data = {
      title: e.target.title.value,
      description: e.target.description.value,
      type: e.target.type.value
    }

    Meteor.call('insertElection', data, function(error, result){
      if(error.error == 'validation-error'){
        alert(error.details.message);
      }else{
        document.getElementById('electionsForm').reset();
        alert('Elección creada');
      }
    })
  }

  render() {
    /*if (this.props.loggedIn) {
      return null;
    }*/
    return (
      <div className='Elections-page'>
        <Navbar/>
        <h1>Elections Page</h1>
        <Form onSubmit = {this.handleSubmit.bind(this)}>
            <Form.Field>
              <Label>Título</Label>
              <Input id = 'Titulo' type = 'text' name = 'title' placeholder = 'Título'/>
            </Form.Field>

            <Form.Field>
              <Label>Descripción</Label>
              <TextArea id = 'Descripcion' name = 'description' placeholder = 'Descripción'/>
            </Form.Field>
            
            <Form.Field>
              <Label>Tipo de elección</Label>
              <Input id = 'Tipo' type = 'text' name = 'type' placeholder = 'Tipo'/>
            </Form.Field>
            <Button type = 'submit'>Crear</Button>
        </Form>
      </div>
    );
  }
}

/*addElections.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};*/

export default addElections;
