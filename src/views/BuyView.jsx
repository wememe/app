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
      price: 0,
      memeId: this.props.history.location.pathname.split('/')[2],
    };
  }

  buyMeme = async () => {
    const { numberOfShares, memeId } = this.state;
    const { wememeContract, address, history } = this.props;

    wememeContract.poolBalance.call(memeId, (e, price) => {
      wememeContract.buy(memeId, {
        from: address,
        value: price
      }, (e, txHash) => {
        this.setState({ imageLoading: true });
        waitForMined(txHash).then(res => {
          this.setState({ imageLoading: false })
          history.push('/');
          getMemes();
        });
      })
    })
  }

  componentDidMount() {
    const { wememeContract } = this.props;
    const { memeId, canvas } = this.state;

    if (wememeContract.content) {
      wememeContract.content.call(memeId, (e, content) => {
        this.setState({ memeURL: content });
        wememeContract.poolBalance.call(memeId, (e, price) => {
          this.setState({ price: web3.fromWei(price, 'ether').toNumber() }) // eslint-disable-line no-undef
        });
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { wememeContract } = nextProps;
    const { memeId, canvas } = this.state;

    if (wememeContract.content) {
      wememeContract.content.call(memeId, (e, content) => {
        this.setState({ memeURL: content });
        wememeContract.poolBalance.call(memeId, (e, price) => {
          this.setState({ price: web3.fromWei(price, 'ether').toNumber() }) // eslint-disable-line no-undef
        });
      })
    }
  }

  render() {
    const { memeURL, price } = this.state;

    return (
      <div className="createPage">

        <div className="create__guide">
          <h2>Buy this meme</h2>
          <p>Build on top of someone else's work by drawing on it.</p>
        </div>

        <div>
          <h1>{price} Eth</h1>
        </div>

        <div className="canvas__wrapper">
          <img src={memeURL} alt="" className="canvas__buy" />
        </div>

        <button
          type="submit"
          className="canvas__save"
          // disabled={disableSave}
          onClick={() => this.buyMeme()}
        >
          Buy
        </button>

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
