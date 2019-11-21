import React from 'react';
import PropTypes from 'prop-types';

import styles from './Publication.module.css';

const Publication = ({ publication: { title, text } }) => {
  return (
    <div>
      <article className={styles.publication}>
        <h2>{title}</h2>
        <p>{text}</p>
      </article>
    </div>
  );
};

Publication.propTypes = {
  publication: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Publication;
