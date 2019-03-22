import React, { Component } from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react'
import Party from '../../../api/Party/Party';
import ShowParty from '../ShowParty/ShowParty';
import './PartyTable.scss';

class PartyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const listParty = this.props.party.fetch().map(party => <ShowParty key={party._id} party={party} />)
    const { partyCount, limit, tablePage, handleMinusTablePage, handlePlusTablePage } = this.props;

    if (partyCount > 0) {
      return <Table unstackable celled fixed compact selectable>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Lema</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {listParty}
        </Table.Body>
      </Table>;
    } else {
      return <h4>No hay planillas</h4>;
    }
  }
}

export default PartyTable;
