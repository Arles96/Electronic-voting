import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Input, Form, Label, TextArea, Message, Container } from 'semantic-ui-react';

import Navbar from '../../components/Navbar/Navbar';

import './Elections.scss';

class addElections extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: '',
      result: ''
    };
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

    Meteor.call('insertElection', data, (error, result) => {
      if(error){
        this.setState({error: error.reason});
      }else{
        document.getElementById('electionsForm').reset();
        this.setState({error: ''});
        this.setState({result: 'Elección creada'})
      }
    });

    setTimeout(() => { this.setState({error: '', result: ''}); }, 5000);
  }

  render() {
    /*if (this.props.loggedIn) {
      return null;
    }*/
    return (
      <div className='Elections-page'>
        <Navbar/>
        <Container>
          <h1>Pagina de elecciones</h1>
          {this.state.error && <Message error content={this.state.error}/>}
          {this.state.result && <Message success content={this.state.result}/>}
          <Form id = 'electionsForm' onSubmit = {this.handleSubmit.bind(this)}>
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
        </Container>
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
