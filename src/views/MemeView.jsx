import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from 'react-color'

import Kittie from '../assets/Kittie.gif'
import { waitForMined, getMemes } from '../utils/smartContract';
import './styles/Create.css';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFileSizeModal: false,
      color: "#000000",
      width: 400,
      height: 400,
      numberOfShares: 100,
      shareValue: 0,
      brushRadius: 10,
      lazyRadius: 12,
      imageLoading: false,
      numberOfShares: 100,
      shareValue: 0,
      memeURL: '',
      creator1: '',
      creator2: '',
      creator3: '',
      owner: '',
      memeId: this.props.history.location.pathname.split('/')[2],
    };
  }

  componentDidMount() {
    const { wememeContract } = this.props;
    const { memeId } = this.state;

    if (wememeContract.content) {
      wememeContract.content.call(memeId, (e, content) => {
        this.setState({ memeURL: content });
        wememeContract.creators.call(memeId, 0, (e, creator1) => {
          wememeContract.creators.call(memeId, 1, (e, creator2) => {
            wememeContract.creators.call(memeId, 2, (e, creator3) => {
              wememeContract.ownerOf.call(memeId, (e, owner) => {
                this.setState({
                  creator1,
                  creator2,
                  creator3,
                  owner,
                })
                window.renderProfileHovers()
              });
            });
          });
        });
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { wememeContract } = nextProps;
    const { memeId } = this.state;

    if (wememeContract.content) {
      wememeContract.content.call(memeId, (e, content) => {
        this.setState({ memeURL: content });
        wememeContract.creators.call(memeId, 0, (e, creator1) => {
          wememeContract.creators.call(memeId, 1, (e, creator2) => {
            wememeContract.creators.call(memeId, 2, (e, creator3) => {
              wememeContract.ownerOf.call(memeId, (e, owner) => {
                this.setState({
                  creator1,
                  creator2,
                  creator3,
                  owner,
                })
                window.renderProfileHovers()
              });
            });
          });
        });
      })
    }
  }

  render() {
    const {
      memeURL,
      creator1,
      creator2,
      creator3,
      owner,
    } = this.state;

    return (
      <div className="createPage">

        <div className="canvas__wrapper">
          <img src={memeURL} alt="" className="canvas__buy" />
        </div>

        <div className="creators__wrapper">
          {owner && (
            <div className="creators">
              <h2>Owned by</h2>
              <threebox-address data-address={owner}></threebox-address>
            </div>
          )}

          {creator1 && (
            <div className="creators">
              <h2>Created by</h2>
              <threebox-address data-address={creator1}></threebox-address>
              <threebox-address data-address={creator2}></threebox-address>
              <threebox-address data-address={creator3}></threebox-address>
            </div>
          )}
        </div>

      </div >
    );
  }
}

Buy.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  wememeContract: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
};

Buy.defaultProps = {
  pathname: {},
  location: {},
  wememeContract: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
  currentAddress: '',
};

const mapState = state => ({
  wememeContract: state.threeBox.wememeContract,
});

export default withRouter(connect(mapState,
  {
    // getProfile,
    // getActivity,
    // handleSignInBanner,
  })(Buy));
