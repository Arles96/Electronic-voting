import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import './PollingStartButtons.scss';

class PollingStartButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div className='polling-start-buttons-body'>
      <Grid style={{ marginTop: 2 + 'vh' }}>
        <Grid.Row columns='equal' verticalAlign='middle'>
          <Grid.Column className='pollig-flex'>
            <div onClick={this.props.handleCreatePolling} className="pollig-start-buttons" style={{ padding: 5 + '%', backgroundColor: 'rgb(244,67,57' }}>
              <Icon style={{ marginBottom: 0 }} inverted name='plus' size='large' />
              <p>Create</p>
            </div>
          </Grid.Column>
          <Grid.Column className='pollig-flex'>
            <div onClick={this.props.handleSharePolling} className='pollig-start-buttons' style={{ padding: 5 + '%', backgroundColor: 'rgb(0, 150, 136)' }}>
              <Icon style={{ marginBottom: 0 }} inverted name='share alternate' size='large' />
              <p>Share</p>
            </div>
          </Grid.Column>
          <Grid.Column className='pollig-flex'>
            <div onClick={this.props.handleListPolling} className='pollig-start-buttons' style={{ padding: 5 + '%', backgroundColor: 'rgb(255, 152, 0)' }}>
              <Icon style={{ marginBottom: 0 }} inverted name='list alternate outline' size='large' />
              <p>List</p>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div >
  }

}
export default PollingStartButtons;

