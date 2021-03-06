// @flow

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { removeStudent } from '../../actions/students';

import styles from './Dropdown.css';

function Dropdown({
  id,
  removeStudent: removeStudentAction,
  open,
  openFolder
}) {
  const dropClass = cx(styles.container, {
    [styles.open]: open
  });
  // console.log(open);
  return (
    <div className={dropClass}>
      <button className={styles.button} type="button" onClick={openFolder}>
        Open Folder
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={() => removeStudentAction(id)}
      >
        Remove
      </button>
    </div>
  );
}

Dropdown.propTypes = {
  id: PropTypes.string,
  removeStudent: PropTypes.func,
  open: PropTypes.bool,
  openFolder: PropTypes.func
};

Dropdown.defaultProps = {
  id: '',
  removeStudent: () => {},
  open: false,
  openFolder: () => {}
};

export default connect(
  null,
  { removeStudent }
)(Dropdown);
