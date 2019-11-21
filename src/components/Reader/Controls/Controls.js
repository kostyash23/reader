import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({ handlePage, length, currentPage }) => {
  return (
    <section className={styles.controls}>
      <button
        type="button"
        name="decrease"
        className={styles.button}
        onClick={handlePage}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <button
        type="button"
        name="increase"
        className={styles.button}
        onClick={handlePage}
        disabled={currentPage === length}
      >
        Вперед
      </button>
    </section>
  );
};

Controls.propTypes = {
  handlePage: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Controls;
