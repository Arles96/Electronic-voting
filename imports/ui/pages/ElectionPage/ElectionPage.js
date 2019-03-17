import React, { Component } from 'react';
import { Icon, Menu, Table, Container, Header, Button} from 'semantic-ui-react'
import './ElectionPage.scss';
import { Meteor } from 'meteor/meteor';
import CreateElection from '../../components/CreateElection/CreateElection';
import Elections from '../../../api/Elections/Elections';
import ShowElection from '../../components/ShowElection/ShowElection';

class ElectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      tablePage: 0,
      dataCount: Elections.find().count()
    };
    this.handlePlusTablePage = this.handlePlusTablePage.bind(this);
    this.handleMinusTablePage = this.handleMinusTablePage.bind(this);
    this.update = this.update.bind(this);
  }

  update() {
    this.forceUpdate();
  }

  handlePlusTablePage = () => this.setState(state => ({ tablePage: state.tablePage + 1 }));
  handleMinusTablePage = () => this.setState(state => ({ tablePage: state.tablePage - 1 }));

  render() {
    <Button circular icon='settings' />

    const { limit, tablePage, dataCount } = this.state;

    let query = Elections.find({}, {
      sort: { createAt: -1 },
      skip: tablePage * limit,
      limit: limit
    });

    let elections = query.fetch().map(election => <ShowElection key={election._id} item={election} update={this.update}/>);

    return <div style={{ paddingRight: 2 + "rem" }}>
      <Container>
        <Header as='h2' icon textAlign='center'>
          <Icon name='archive' circular />
          <Header.Content>Elecciones</Header.Content>
        </Header>
        <CreateElection update={this.update} />
        {dataCount > 0 ?
          <Table unstackable celled fixed compact selectable>

            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Clausura</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {elections}
            </Table.Body>
            {Math.floor(dataCount / limit) > 0 ?
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>
                    <Menu floated='right' pagination>
                      {tablePage > 0 ?
                        < Menu.Item as='a' icon onClick={this.handleMinusTablePage}>
                          <Icon name='chevron left' />
                        </Menu.Item> : null}
                      {tablePage < Math.floor(dataCount / limit) ?
                        < Menu.Item as='a' icon onClick={this.handlePlusTablePage}>
                          <Icon name='chevron right' />
                        </Menu.Item> : null}
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer> : null}
          </Table> : <h4>No hay Elecciones</h4>}
      </Container>
    </div >;
  }
}

export default ElectionPage;
