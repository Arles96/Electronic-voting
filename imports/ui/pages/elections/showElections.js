import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Table, Container } from 'semantic-ui-react';

import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';

import { Elections } from '../../../api/elections/elections'
import './Elections.scss';

class showElections extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.state = {
      list: []
    }
  }

  componentWillMount(){
    Tracker.autorun(() => {
      Meteor.subscribe('elections.all');
    });

    var elec = Elections.find({}).fetch();
    
    this.setState({
      list: elec
    });
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
          <Table celled>
              <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell>Título</Table.HeaderCell>
                      <Table.HeaderCell>Descripción</Table.HeaderCell>
                      <Table.HeaderCell>Tipo</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>

              <Table.Body>
                  { 
                    this.state.list.map((val, index)=>{
                        return (
                          <Table.Row key={index}>
                              <Table.Cell>{val.title}</Table.Cell>
                              <Table.Cell>{val.description}</Table.Cell>
                              <Table.Cell>{val.type}</Table.Cell>
                          </Table.Row>
                        )
                    })
                  }
              </Table.Body>
          </Table>
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

export default showElections;
