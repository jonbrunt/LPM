// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Title from './Title';
// import AppFunctions from './AppFunctions';
import LinksContainer from './LinksContainer';
import styles from './Sidebar.css';

type Props = {};

class Sidebar extends Component<Props> {
  props: Props;

  render() {
    const { section, profilePic, ghOauth } = this.props;
    return (
      <div className={styles.sidebar}>
        <Title profilePic={profilePic} loggedIn={ghOauth !== 'TOKEN'} />
        {/* <AppFunctions /> */}
        <LinksContainer section={section} />
        <p className={styles.credits}>
          by: Moises Dobarganes &amp; Ronnie Miksch
        </p>
      </div>
    );
  }
}

Sidebar.propTypes = {
  section: PropTypes.string,
  profilePic: PropTypes.string,
  ghOauth: PropTypes.string
};

Sidebar.defaultProps = {
  section: 'defaul tprop',
  profilePic: 'URL',
  ghOauth: 'TOKEN'
};

const mapStateToProps = state => ({
  section: state.preferences.section,
  profilePic: state.api.profilePic,
  ghOauth: state.auth.ghOauth
});

export default connect(mapStateToProps)(Sidebar);
