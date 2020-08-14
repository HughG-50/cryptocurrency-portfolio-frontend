import React, { Component } from 'react';
import Search from './Search';
import Calculate from './Calculate';
import Portfolio from './Portfolio';
import axios from 'axios';

class PortfolioContainer extends Component {
  state = {
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: '',
  };

  handleChange = (e) => {
    axios
      // .post('http://localhost:3000/search', {
      .post('https://mysterious-beyond-72605.herokuapp.com/search', {
        search: e.target.value,
      })
      .then((data) => {
        this.setState({
          search_results: [...data.data.currencies],
        });
      })
      .catch((err) => console.log(err));
  };

  handleSelect = (curr, e) => {
    e.preventDefault();

    const activeCurrency = this.state.search_results.find(
      (item) => item.id == curr.id
    );

    this.setState({
      active_currency: activeCurrency,
      search_results: [],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let currency = this.state.active_currency;
    let amount = this.state.amount;

    axios
      // .post('http://localhost:3000/calculate', {
      .post('https://mysterious-beyond-72605.herokuapp.com/calculate', {
        id: currency.id,
        amount: amount,
      })
      .then((data) => {
        console.log(data);
        this.setState({
          amount: '',
          active_currency: null,
          portfolio: [...this.state.portfolio, data.data],
        });
      })
      .catch((data) => {
        debugger;
      });
  };

  handleAmount = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const searchOrCalculate = this.state.active_currency ? (
      <Calculate
        handleChange={this.handleAmount}
        handleSubmit={this.handleSubmit}
        active_currency={this.state.active_currency}
        amount={this.state.amount}
      />
    ) : (
      <Search
        searchResults={this.state.search_results}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
      />
    );

    return (
      <div className="grid">
        <div className="left">{searchOrCalculate}</div>
        <div className="right">
          <Portfolio portfolio={this.state.portfolio} />
        </div>
      </div>
    );
  }
}

export default PortfolioContainer;
