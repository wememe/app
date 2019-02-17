import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MemeTile from '../components/MemeTile';

import './styles/Create.css';
import './styles/Buy.css';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { forGallery } = this.props;

    return (
      <div className="buyPage">

        <div className="gallery__headline">
          <h2>Sold Memes</h2>
          <p>Gander completed works by the community.</p>
        </div>

        <div className="buy__grid">
          {forGallery.map((meme, i) => (
            <MemeTile key={i} meme={meme} />
          ))}
        </div>

      </div>
    );
  }
}

Buy.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
  forGallery: PropTypes.array,
};

Buy.defaultProps = {
  pathname: {},
  location: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
  currentAddress: '',
  forGallery: [],
};

const mapState = state => ({
  forGallery: state.threeBox.forGallery,
});

export default withRouter(connect(mapState,
  {
    // getProfile,
    // getActivity,
    // handleSignInBanner,
  })(Buy));
