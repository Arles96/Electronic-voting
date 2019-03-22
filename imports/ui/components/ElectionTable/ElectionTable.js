import React, { Component } from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react'
import Elections from '../../../api/Elections/Elections';
import ShowElection from '../ShowElection/ShowElection';
import './ElectionTable.scss';

class ElectionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listElections: Elections.find({}, {
        sort: { createAt: -1 },
        skip: props.tablePage * props.limit,
        limit: props.limit
      }).fetch().map(election => <ShowElection key={election._id} election={election} />)
    };
  }

  render() {
    const { listElections } = this.state;
    const { electionCount, limit, tablePage, handleMinusTablePage, handlePlusTablePage } = this.props;

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

export default ElectionTable;
