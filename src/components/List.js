import React from 'react';
import { handleResponse } from '../helpers/helpers';
import { API_ROOT_URL } from '../helpers/config';
import Loading from './Loading';
import Table from './Table';
import Page from './Page';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const { page } = this.state;

    fetch(`${API_ROOT_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false
        });
      });
  }

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}</span>
    }
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }
    if (error) {
      return <div className="error">{error}</div>
    }
    return (
      <div>
        <Table
          currencies={currencies}
          renderChangePercent={this.renderChangePercent.bind(this)}
        />
        <Page
          page={page}
          totalPages={totalPages}
        />
      </div>
    );
  }
}

export default List;
