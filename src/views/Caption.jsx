import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FileSizeModal } from '../components/Modals';
import './styles/Create.css';

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: true,
      showFileSizeModal: false,
    };
  }

  closeFileSizeModal = () => {
    this.setState({ showFileSizeModal: false });
  }

  handleUpdatePic = (photoFile, e) => {
    if (photoFile.size <= 2500000) {
      const formData = new window.FormData();
      formData.append('path', photoFile);
      this.setState({ disableSave: false });
    } else {
      e.target.value = null;
      this.setState({ showFileSizeModal: true });
    }
  }

  render() {
    const { disableSave, showFileSizeModal } = this.state;

    return (
      <div className="createPage">

        {showFileSizeModal
          && <FileSizeModal show={showFileSizeModal} closeFileSizeModal={this.closeFileSizeModal} />}

        <div className="create__guide">
          <h2>Draw on your meme</h2>
          <p>Build on top of someone else's work by drawing on it.</p>
        </div>
        <div className="progress__wrapper">
          <div className="progress__steps">
            <p>Start</p>
            <p>Draw</p>
            <p>Caption</p>
          </div>

          <div className="progress__bar__wrapper">
            <div className="progress__bar" />
            <div className="progress__bar" />
            <div className="progress__bar" />
          </div>
        </div>

        <div className="canvas__wrapper">
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

        <Link to="/buy">
          <button
            type="submit"
          // disabled={disableSave}
          >
            Sell
          </button>
        </Link>

      </div>
    );
  }
}

Draw.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  location: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
};

Draw.defaultProps = {
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
  })(Draw));
