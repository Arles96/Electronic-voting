import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Input, Form, Label, TextArea, Container } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';

import './votingForms.scss';

class addVotingForms extends React.Component {
  constructor(props) {
    super(props);
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
      name: e.target.name.value
    }

    Meteor.call('insertVotingForm', data, function(error, result){
      if(error){
        this.setState({error: error.reason});
      }else{
        document.getElementById('votingformForm').reset();
        this.setState({error: ''});
        this.setState({result: 'Elección creada'})
      }
    });
  }

  render() {
    /*if (this.props.loggedIn) {
      return null;
    }*/
    return (
      <div className='votingForms-page'>
        <Navbar/>
        <Container>
          <h1>Pagina de planillas</h1>
          {this.state.error && <Message error content={this.state.error}/>}
          {this.state.result && <Message success content={this.state.result}/>}
          <Form id = 'votingformForm' onSubmit = {this.handleSubmit.bind(this)}>
              <Form.Field>
                <Label>Nombre de la planilla</Label>
                <Input id = 'NombrePlanilla' type = 'text' name = 'name' placeholder = 'Nombre de la planilla'/>
              </Form.Field>

              <Button type = 'submit'>Crear</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

/*addVotingForms.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};*/

export default addVotingForms;
