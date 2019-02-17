import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { handleSignOut } from '../state/actions';
import * as routes from '../utils/routes';
import { normalizeURL } from '../utils/funcs';
import Wememe from '../assets/wememe.png';
import Pencil from '../assets/Pencil.svg';
import SignOut from '../assets/SignOut.svg';
import Add from '../assets/Add.svg';
import './styles/Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileModal: false,
    };
  }

  handleDropdown = () => {
    const { showProfileModal } = this.state;
    this.setState({
      showProfileModal: !showProfileModal,
    });
  }

  handleSignOut = () => {
    const { threeBox } = this.props;
    if (threeBox.logout) {
      this.props.handleSignOut();
    }
  }

  render() {
    const { showProfileModal } = this.state;
    const { image, location, showDownloadBanner, isLoggedIn, currentAddress } = this.props;
    const { pathname } = location;
    const normalizedPath = normalizeURL(pathname);
    const networkColor = this.props.currentNetwork;

    return (
      <nav>
        <div id="nav__logo--marginLeft">
          <Link to="/">
            <img src={Wememe} alt="" className="landing__nav__logo" />
          </Link>
        </div>

        <div className="nav__dropdown__links">
          <Link to="/create">
            <li className="nav__dropdown__wrapper">
              Upload
            </li>
          </Link>
          <Link to="/draw">
            <li className="nav__dropdown__wrapper">
              Draw
              </li>
          </Link>
          <Link to="/caption">
            <li className="nav__dropdown__wrapper">
              Caption
              </li>
          </Link>
          <Link to="/gallery">
            <li>Sold</li>
          </Link>
        </div>

        {showProfileModal &&
          <div className='onClickOutside' onClick={this.handleDropdown} />}
        <div id={showProfileModal ? 'dropdownContainer' : undefined} onClick={this.handleDropdown} />

        {/* {showProfileModal &&
          <div className='onClickOutside' onClick={this.handleDropdown} />}
        <div id={showProfileModal ? 'dropdownContainer' : undefined} onClick={this.handleDropdown} /> */}

      </nav>
    );
  }
}

Nav.propTypes = {
  image: PropTypes.array,
  threeBox: PropTypes.object,
  location: PropTypes.object,
  handleSignOut: PropTypes.func.isRequired,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  showDownloadBanner: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

Nav.defaultProps = {
  image: [],
  threeBox: {},
  currentNetwork: '',
  currentAddress: '',
  location: {},
  showDownloadBanner: false,
  isLoggedIn: false,
};

function mapState(state) {
  return {
    image: state.threeBox.image,
    threeBox: state.threeBox.box,
    currentNetwork: state.threeBox.currentNetwork,
    showDownloadBanner: state.threeBox.showDownloadBanner,
    isLoggedIn: state.threeBox.isLoggedIn,
    currentAddress: state.threeBox.currentAddress,
  };
}

export default withRouter(connect(mapState, { handleSignOut })(Nav));