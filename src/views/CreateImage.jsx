import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FileSizeModal } from '../components/Modals';
import { waitForMined } from '../utils/smartContract';
import Kittie from '../assets/Kittie.gif'
import './styles/Create.css';

class ProfilePublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: true,
      showFileSizeModal: false,
      numberOfShares: 100,
      shareValue: 0,
      imageLoading: false,
    };
  }

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  }

  handleUpdatePic = (photoFile, e) => {
    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append('path', photoFile);
      this.setState({ disableSave: false, buffer: formData, });
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  }

  handleSlider = (e) => {
    const { wememeContract, topId } = this.props;
    const numberOfShares = e.target.value;

    wememeContract.priceToMint.call(topId, numberOfShares, (err, price) => {
      const shareValue = web3.fromWei(price.toNumber(), 'ether') // eslint-disable-line no-undef
      this.setState({ numberOfShares, shareValue });
    })

  }

  fetchPic = buffer => window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
    method: 'post',
    'Content-Type': 'multipart/form-data',
    body: buffer,
  });

  createMeme = async () => {
    const { buffer, numberOfShares } = this.state;
    const { wememeContract, address, history } = this.props;

    const fetch = await this.fetchPic(buffer);
    const returnedData = await fetch.json();
    const content = `https://ipfs.infura.io/ipfs/${returnedData.Hash}`;

    wememeContract.topId.call((e, topId) => {
      wememeContract.priceToMint.call(topId, numberOfShares, (e, price) => {
        wememeContract.meme(topId, numberOfShares, content, {
          from: address,
          value: price
        }, (e, txHash) => {
          // push user to home page
          this.setState({ imageLoading: true });
          waitForMined(txHash).then(res => {
            this.setState({ imageLoading: false })
            history.push('/');
          });
        })
      })
    })

  }

  render() {
    const { disableSave, showFileSizeModal, numberOfShares, shareValue, imageLoading } = this.state;

    return (
      <div className="createPage">

        {showFileSizeModal
          && <FileSizeModal show={showFileSizeModal} closeFileSizeModal={this.closeFileSizeModal} />}

        <div className="create__guide">
          <h2>Start your meme</h2>
          <p>Begin by uploading an image you think would make for a great beginning of a meme.</p>
        </div>

        <div className="progress__wrapper">
          <div className="progress__steps">
            <p>Start</p>
            <p>Draw</p>
            <p>Caption</p>
          </div>

          <div className="progress__bar__wrapper">
            <div className="progress__bar" />
            <div className="progress__bar grey" />
            <div className="progress__bar grey" />
          </div>
        </div>

        <div className="canvas__wrapper">
          <div className="canvas__canvas">
            {(this.coverUpload && this.coverUpload.files && this.coverUpload.files[0])
              ? (
                <img
                  className="canvas"
                  alt="profile"
                  src={(this.coverUpload && this.coverUpload.files && this.coverUpload.files[0])
                    && URL.createObjectURL(this.coverUpload.files[0])}
                />)
              : <div className="canvas" />
            }

            <label htmlFor="coverInput" className="canvas__upload--wrapper">
              <input
                id="coverInput"
                type="file"
                name="coverPic"
                className="light"
                accept="image/*"
                onChange={e => this.handleUpdatePic(e.target.files[0], e, true)}
                ref={ref => this.coverUpload = ref}
              />
              <div className="canvas__upload">
                Edit
              </div>
            </label>
          </div>

          <div className="canvas__controls">

            {!imageLoading
              ? (
                <React.Fragment>
                  <div className="canvas__controls__shares">
                    <div>
                      <h3>Buy Shares</h3>
                      <p>How many shares do you want to buy in this meme?</p>
                      <p>Buy more shares to earn more when it sells</p>
                    </div>
                    <div>
                      <h4>{numberOfShares}</h4>
                      <p>Shares</p>
                      <input
                        type="range"
                        min="10"
                        max="1000000000"
                        value={numberOfShares}
                        onChange={(e) => this.handleSlider(e)}
                      />
                    </div>
                    <div>
                      <p>This will cost</p>
                      <h4>{shareValue} Eth</h4>
                    </div>
                  </div>

                  <div className="canvas__controls__shares">

                  </div>

                  <div>
                    {/* <Link to="/draw" className="canvas__save"> */}
                    <button
                      type="submit"
                      className="canvas__save"
                      disabled={disableSave}
                      onClick={() => this.createMeme()}
                    >
                      Submit
                    </button>
                    {/* </Link> */}
                  </div>
                </React.Fragment>
              )
              : <img src={Kittie} alt="" />
            }
          </div>
        </div>

        <div className="meme__metaData">
        </div>

      </div>
    );
  }
}

ProfilePublic.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  wememeContract: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
  address: PropTypes.string,
  topId: PropTypes.number,
};

ProfilePublic.defaultProps = {
  pathname: {},
  location: {},
  wememeContract: {},
  isLoadingPublicProfile: true,
  showSignInBanner: false,
  currentAddress: '',
  address: '',
  topId: 0,
};

const mapState = state => ({
  wememeContract: state.threeBox.wememeContract,
  topId: state.threeBox.topId,
  address: state.threeBox.address,
});

export default withRouter(connect(mapState,
  {
    // getProfile,
    // getActivity,
    // handleSignInBanner,
  })(ProfilePublic));
