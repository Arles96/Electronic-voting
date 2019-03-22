import React, { Component } from 'react';
import './Breadcrumb.scss';
import { Breadcrumb } from 'semantic-ui-react';
import { cpus } from 'os';

class MyBreadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: props.sections
    }
  }

  render() {
    return <Breadcrumb icon='right angle' sections={this.state.sections} />;
  }
}

export default MyBreadcrumb;