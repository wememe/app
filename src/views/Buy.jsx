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
    const { forMarket } = this.props;
    return (
      <div className="buyPage">

        <div className="gallery__headline">
          <h2>Meme Market</h2>
          <p>Begin by uploading an image you think would make for a great beginning of a meme.</p>
        </div>

        <div className="buy__grid">
          {forMarket.map((meme, i) => (
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
  forMarket: PropTypes.array,
};

Buy.defaultProps = {
  pathname: {},
  location: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
  currentAddress: '',
  forMarket: [],
};

const mapState = state => ({
  forMarket: state.threeBox.forMarket,
});

export default withRouter(connect(mapState,
  {
    // getProfile,
    // getActivity,
    // handleSignInBanner,
  })(Buy));
