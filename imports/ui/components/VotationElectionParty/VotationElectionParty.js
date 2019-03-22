import _ from 'lodash'
import React, { Component } from 'react';
import Party from '../../../api/Party/Party';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import './VotationElectionParty.scss';
import { Meteor } from 'meteor/meteor';
import Elections from '../../../api/Elections/Elections';
 
class VotationElectionParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState(state => ({ isLoading: false, results: [], value: '' }));

  handleResultSelect = (e, { result }) => {
    this.setState(state => ({ value: (result.title), userId: result.key }))
    console.log(result.key)
    this.props.handleSelectElection(result.key);
  };

  handleSearchChange = (e, { value }) => {
    this.setState(state => ({ isLoading: true, value }));

    setTimeout(() => {
      const { value } = this.state;
      const elections = Elections.find({
        _id: { $nin: Party.findOne({ _id: this.props.party._id }).elections }
      }).fetch().map(item => ({
        title: item.name,
        key: item._id
      }));

      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(elections, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Search
        input={{ icon: 'search', iconPosition: 'left' }}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
      />
    )
  }

}

export default VotationElectionParty;
