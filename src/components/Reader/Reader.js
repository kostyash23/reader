import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import styles from './Reader.module.css';

import data from '../../assets/publications.json';
import Publication from './Publication/Publication';
import Counter from './Counter/Counter';
import Controls from './Controls/Controls';

class Reader extends Component {
  state = { item: 1, publication: {} };

  componentDidMount() {
    const { location, history } = this.props;
    const { item } = this.state;

    const query = Number(queryString.parse(location.search).item);
    if (query && query > 0 && query < data.length) {
      this.setState({
        publication: data.find(publication => publication.item === query),
        item: query,
      });
    } else {
      history.replace({
        ...location,
        search: `item=${item}`,
        pathname: '/reader',
      });

      this.setState({
        publication: data.find(publication => publication.item === item),
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { item } = this.state;
    const prevItem = queryString.parse(prevProps.location.search).item;
    if (item !== Number(prevItem))
      this.setState({
        publication: data.find(
          publication => publication.item === Number(item),
        ),
      });
  }

  handleItemChange = e => {
    const { location, history } = this.props;

    const redirect = () => {
      return history.push({
        ...location,
        search: `item=${this.state.item}`,
        pathname: '/reader',
      });
    };

    if (e.target.name === 'decrease') {
      this.setState(prevState => ({ item: prevState.item - 1 }), redirect);
    } else {
      this.setState(prevState => ({ item: prevState.item + 1 }), redirect);
    }
  };

  render() {
    const { item, publication } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.reader}>
        <Controls
          currentPage={item}
          length={data.length}
          handlePage={this.handleItemChange}
        />

        <Counter currentPage={item} length={data.length} />
        <Switch>
          <Route
            to={{
              pathname: `/reader`,
              search: `?item=${item}`,
            }}
            render={() => <Publication publication={publication} />}
          />

          <Redirect
            to={{
              ...location,

              pathname: '/reader',
            }}
            component={Publication}
          />
        </Switch>
      </div>
    );
  }
}

Reader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Reader);
