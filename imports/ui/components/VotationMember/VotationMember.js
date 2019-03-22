import _ from 'lodash'
import React, { Component } from 'react';
import Elections from '../../../api/Elections/Elections';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import './VotationMember.scss';
import { Meteor } from 'meteor/meteor';

class VotationMember extends Component {
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
    this.props.handleSelectMember(result.key);
  };

  handleSearchChange = (e, { value }) => {
    this.setState(state => ({ isLoading: true, value }));

    setTimeout(() => {
      const { value } = this.state;
      const members = Meteor.users.find({
        _id: { $nin: Elections.findOne({ _id: this.props.election._id }).members }
      }).fetch().map(item => ({
        title: item.profile.firstName + " " + item.profile.lastName,
        key: item._id
      }));

      if (value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(members, isMatch),
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

export default VotationMember;
