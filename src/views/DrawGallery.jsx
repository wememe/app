import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MemeTile from '../components/MemeTile';

import './styles/Create.css';
import './styles/Buy.css';

class DrawGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="buyPage">

        <div className="create__guide">
          <h2>Draw Gallery</h2>
          <p>Find a work by another user to draw on.</p>
        </div>

        <div className="buy__grid">
          <MemeTile />
          <MemeTile />
          <MemeTile />
          <MemeTile />
          <MemeTile />
          <MemeTile />
          <MemeTile />
        </div>

      </div>
    );
  }
}

DrawGallery.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
};

DrawGallery.defaultProps = {
  pathname: {},
  location: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
  currentAddress: '',
};

const mapState = state => ({
  // currentAddress: state.threeBox.currentAddress,
});

export default withRouter(connect(mapState,
  {
    // getProfile,
    // getActivity,
    // handleSignInBanner,
  })(DrawGallery));
