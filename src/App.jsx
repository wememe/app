import React, { Component, Suspense, lazy } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as routes from './utils/routes';
import { normalizeURL, matchProtectedRoutes } from './utils/funcs';
import { startWeMeme, getMemes } from './utils/smartContract';
import { store } from './state/store';
import Landing from './views/Landing';
import MyProfile from './views/MyProfile';
import PubProfile from './views/PubProfile';
import NoMatch from './views/NoMatch';
import EditProfile from './views/EditProfile';
import Profiles from './views/Profiles';
import Jobs from './views/Jobs';
import Privacy from './views/Privacy';
import Terms from './views/Terms';
import Create from './views/Create';
import Buy from './views/Buy';
import BuyView from './views/BuyView';
import Gallery from './views/Gallery';
import CaptionGallery from './views/CaptionGallery';
import DrawGallery from './views/DrawGallery';
import CreateImage from './views/CreateImage';
import Caption from './views/Caption';
import Draw from './views/Draw';
import Nav from './components/Nav';
import history from './history';
import './index.css';

import {
  getProfileData,
  getPublicMemberSince,
  getVerifiedPublicGithub,
  getVerifiedPublicTwitter,
  getActivity,
  getBox,
  requestAccess,
  checkWeb3Wallet,
  checkNetwork,
  handleSignOut,
} from './state/actions';

import {
  handleSignInModal,
  closeErrorModal,
  handleRequireWalletLoginModal,
  handleSwitchedNetworkModal,
  handleAccessModal,
  closeRequireMetaMaskModal,
  handleConsentModal,
  handleDeniedAccessModal,
  handleLoggedOutModal,
  handleSwitchedAddressModal,
  requireMetaMaskModal,
  handleDownloadMetaMaskBanner,
  handleMobileWalletModal,
  handleOnboardingModal,
} from './state/actions-modals';

const Footer = lazy(() => import('./components/Footer'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    await startWeMeme();
    getMemes();
  }

  render() {
    const {
      errorMessage,
      showErrorModal,
      isLoggedIn,
      isSignedIntoWallet,
    } = this.props;

    return (
      <div className="App">

        <Nav />

        <Switch>
          <Route
            exact
            path={routes.LANDING}

            render={() => (
              <Landing
                handleSignInUp={this.handleSignInUp}
                isLoggedIn={isLoggedIn}
                errorMessage={errorMessage}
                showErrorModal={showErrorModal}
                isSignedIntoWallet={isSignedIntoWallet}
              />
            )}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/activity"
            component={MyProfile}
          />
          <Redirect from="/profile" to="/" />
          <Redirect from="/editprofile" to="/" />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/details"
            component={MyProfile}
          />

          <Route
            exact
            path="/gallery"
            component={Gallery}
          />

          <Route
            exact
            path="/buy"
            component={Buy}
          />

          <Route
            exact
            path="/buy/:memeId"
            component={BuyView}
          />

          <Route
            exact
            path="/buy"
            component={Buy}
          />

          <Route
            exact
            path="/create"
            component={CreateImage}
          />

          <Route
            exact
            path="/draw/:memeId"
            component={Draw}
          />

          <Route
            exact
            path="/draw"
            component={DrawGallery}
          />

          <Route
            exact
            path="/caption/:memeId"
            component={Caption}
          />

          <Route
            exact
            path="/caption"
            component={CaptionGallery}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)/edit"
            component={EditProfile}
          />

          <Route
            exact
            path={routes.JOBS}
            component={() => (
              <Jobs
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path={routes.PRIVACY}
            component={() => (
              <Privacy
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path={routes.TERMS}
            component={() => (
              <Terms
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            path={routes.CREATE}
            exact
            component={() => (
              <Create
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            path={routes.PROFILES}
            exact
            component={() => (
              <Profiles
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

          <Route
            exact
            path="(^[/][0][xX]\w{40}\b)"
            component={PubProfile}
          />

          <Route
            component={() => (
              <NoMatch
                isLoggedIn={isLoggedIn}
                handleSignInUp={this.handleSignInUp}
              />
            )}
          />

        </Switch>

        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    );
  }
}

App.propTypes = {
  getBox: PropTypes.func.isRequired,
  requestAccess: PropTypes.func.isRequired,
  getProfileData: PropTypes.func.isRequired,
  getPublicMemberSince: PropTypes.func.isRequired,
  getVerifiedPublicGithub: PropTypes.func.isRequired,
  getVerifiedPublicTwitter: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  checkWeb3Wallet: PropTypes.func.isRequired,
  requireMetaMaskModal: PropTypes.func.isRequired,
  handleDownloadMetaMaskBanner: PropTypes.func.isRequired,
  handleMobileWalletModal: PropTypes.func.isRequired,
  handleSwitchedNetworkModal: PropTypes.func.isRequired,
  handleAccessModal: PropTypes.func.isRequired,
  closeRequireMetaMaskModal: PropTypes.func.isRequired,
  handleConsentModal: PropTypes.func.isRequired,
  handleDeniedAccessModal: PropTypes.func.isRequired,
  handleRequireWalletLoginModal: PropTypes.func.isRequired,
  handleSignInModal: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  checkNetwork: PropTypes.func.isRequired,
  closeErrorModal: PropTypes.func.isRequired,
  handleLoggedOutModal: PropTypes.func.isRequired,
  handleSwitchedAddressModal: PropTypes.func.isRequired,
  handleOnboardingModal: PropTypes.func.isRequired,

  showDifferentNetworkModal: PropTypes.bool,
  onSyncFinished: PropTypes.bool,
  hasSignedOut: PropTypes.bool,
  isSyncing: PropTypes.bool,
  accessDeniedModal: PropTypes.bool,
  errorMessage: PropTypes.string,
  allowAccessModal: PropTypes.bool,
  alertRequireMetaMask: PropTypes.bool,
  provideConsent: PropTypes.bool,
  signInToWalletModal: PropTypes.bool,
  signInModal: PropTypes.bool,
  mobileWalletRequiredModal: PropTypes.bool,
  showErrorModal: PropTypes.bool,
  directLogin: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isSignedIntoWallet: PropTypes.bool,
  loggedOutModal: PropTypes.bool,
  switchedAddressModal: PropTypes.bool,
  onBoardingModal: PropTypes.bool,
  onBoardingModalTwo: PropTypes.bool,
  ifFetchingThreeBox: PropTypes.bool,
  showDownloadBanner: PropTypes.bool,
  onPublicProfilePage: PropTypes.bool,
  prevNetwork: PropTypes.string,
  currentNetwork: PropTypes.string,
  currentAddress: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  prevAddress: PropTypes.string,
};

App.defaultProps = {
  showDifferentNetworkModal: false,
  accessDeniedModal: false,
  onSyncFinished: false,
  hasSignedOut: false,
  onPublicProfilePage: false,
  isSyncing: false,
  errorMessage: '',
  allowAccessModal: false,
  alertRequireMetaMask: false,
  provideConsent: false,
  signInToWalletModal: false,
  signInModal: false,
  mobileWalletRequiredModal: false,
  showErrorModal: false,
  showDownloadBanner: false,
  loggedOutModal: false,
  switchedAddressModal: false,
  onBoardingModal: false,
  onBoardingModalTwo: false,
  ifFetchingThreeBox: false,
  isLoggedIn: false,
  isSignedIntoWallet: false,
  prevNetwork: '',
  currentNetwork: '',
  prevAddress: '',
  directLogin: '',
  currentAddress: '',
};

const mapState = state => ({
  showDifferentNetworkModal: state.threeBox.showDifferentNetworkModal,
  allowAccessModal: state.threeBox.allowAccessModal,
  alertRequireMetaMask: state.threeBox.alertRequireMetaMask,
  onSyncFinished: state.threeBox.onSyncFinished,
  isSyncing: state.threeBox.isSyncing,
  provideConsent: state.threeBox.provideConsent,
  signInToWalletModal: state.threeBox.signInToWalletModal,
  signInModal: state.threeBox.signInModal,
  mobileWalletRequiredModal: state.threeBox.mobileWalletRequiredModal,
  directLogin: state.threeBox.directLogin,
  loggedOutModal: state.threeBox.loggedOutModal,
  switchedAddressModal: state.threeBox.switchedAddressModal,
  onBoardingModal: state.threeBox.onBoardingModal,
  hasSignedOut: state.threeBox.hasSignedOut,
  onBoardingModalTwo: state.threeBox.onBoardingModalTwo,
  prevNetwork: state.threeBox.prevNetwork,
  currentNetwork: state.threeBox.currentNetwork,
  ifFetchingThreeBox: state.threeBox.ifFetchingThreeBox,
  errorMessage: state.threeBox.errorMessage,
  prevAddress: state.threeBox.prevAddress,
  isLoggedIn: state.threeBox.isLoggedIn,
  showErrorModal: state.threeBox.showErrorModal,
  accessDeniedModal: state.threeBox.accessDeniedModal,
  isSignedIntoWallet: state.threeBox.isSignedIntoWallet,
  showDownloadBanner: state.threeBox.showDownloadBanner,
  onPublicProfilePage: state.threeBox.onPublicProfilePage,
  currentAddress: state.threeBox.currentAddress,
  wememeContract: state.threeBox.wememeContract,
  address: state.threeBox.address,
});

export default withRouter(connect(mapState,
  {
    getBox,
    requestAccess,
    getProfileData,
    getPublicMemberSince,
    getVerifiedPublicGithub,
    getVerifiedPublicTwitter,
    getActivity,
    checkWeb3Wallet,
    requireMetaMaskModal,
    checkNetwork,
    handleDownloadMetaMaskBanner,
    handleMobileWalletModal,
    handleSignInModal,
    handleRequireWalletLoginModal,
    handleSwitchedNetworkModal,
    handleAccessModal,
    handleConsentModal,
    handleDeniedAccessModal,
    handleLoggedOutModal,
    handleSignOut,
    handleSwitchedAddressModal,
    handleOnboardingModal,
    closeErrorModal,
    closeRequireMetaMaskModal,
  })(App));

      // else if (typeof window.web3 === 'undefined' && isProtectedPath) { // No wallet and lands on restricted page
    //   history.push(routes.LANDING);
    // } else if (splitRoute.length > 1 && splitRoute[1].substring(0, 2) === '0x' && !isProtectedPath) {
    //   this.loadForLandOnPublicProfile();
    // } else {
    //   // console.log('landed on unprotected route that isnt a public profile');
    // }