import React from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.module.css';

const Counter = ({ currentPage, length }) => {
  return (
    <p className={styles.counter}>
      {currentPage}/{length}
    </p>
  );
};

Counter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export default Counter;
