import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Table, Menu, Icon } from 'semantic-ui-react'
import Elections from '../../../api/Elections/Elections';
import './ElectionTable.scss';

class ElectionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { listElections, electionCount, limit, tablePage, handleMinusTablePage, handlePlusTablePage } = this.props;

    if (electionCount > 0) {
      return <Table unstackable celled fixed compact selectable>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Clausura</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {listElections}
        </Table.Body>
        {Math.floor(electionCount / limit) > 0 ?
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  {tablePage > 0 ?
                    < Menu.Item as='a' icon onClick={handleMinusTablePage}>
                      <Icon name='chevron left' />
                    </Menu.Item> : null}
                  {tablePage < Math.floor(electionCount / limit) ?
                    < Menu.Item as='a' icon onClick={handlePlusTablePage}>
                      <Icon name='chevron right' />
                    </Menu.Item> : null}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer> : null}
      </Table>;
    } else {
      return <h4>No hay Elecciones</h4>;
    }
  }
}


ElectionTable.propTypes = {
  electionsReady: PropTypes.bool.isRequired
};

export default withTracker(props => {
  const electionsSub = Meteor.subscribe('Elections.all');
  const elections = Elections.find();
  const electionsReady = electionsSub.ready() && !!elections;
  return {
    user: Meteor.user(),
    electionsReady: electionsReady
  };
})(ElectionTable);
