import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MemeTile from '../components/MemeTile';

import './styles/Create.css';
import './styles/Buy.css';

class CaptionGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { forCaption } = this.props;

    return (
      <div className="buyPage">

        <div className="gallery__headline">
          <h2>Caption Gallery</h2>
          <p>Find a work by two users to give a caption.</p>
        </div>

        <div className="buy__grid">
          {forCaption.map((meme, i) => (
            <MemeTile key={i} meme={meme} />
          ))}
        </div>

      </div>
    );
  }
}

CaptionGallery.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
  forCaption: PropTypes.array,
};

CaptionGallery.defaultProps = {
  pathname: {},
  location: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
  currentAddress: '',
  forCaption: [],
};

const mapState = state => ({
  forCaption: state.threeBox.forCaption,
});

export default withRouter(connect(mapState,
  {
    // getProfile,
    // getActivity,
    // handleSignInBanner,
  })(CaptionGallery));
