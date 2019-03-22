import React, { Component } from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react'
import Party from '../../../api/Party/Party';
import ShowParty from '../ShowParty/ShowParty';
import './PartyTable.scss';

class PartyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listParty:props.party.fetch().map(party => <ShowParty key={party._id} party={party} />)
    };
  }

  render() {
    const { listParty } = this.state;
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
        {Math.floor(partyCount / limit) > 0 ?
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  {tablePage > 0 ?
                    < Menu.Item as='a' icon onClick={handleMinusTablePage}>
                      <Icon name='chevron left' />
                    </Menu.Item> : null}
                  {tablePage < Math.floor(partyCount / limit) ?
                    < Menu.Item as='a' icon onClick={handlePlusTablePage}>
                      <Icon name='chevron right' />
                    </Menu.Item> : null}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer> : null}
      </Table>;
    } else {
      return <h4>No hay planillas</h4>;
    }
  }
}

export default PartyTable;
