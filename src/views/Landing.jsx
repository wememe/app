import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import './styles/Landing.css';
import '../components/styles/Nav.css';

const Landing = () => (
  <div id="landing">

    <div className="landing">

      <div className="landing__hero">
        <div className="landing__hero__copy">
          <h1 className="landing__hero__copy__tagline">WeMeme</h1>
          <p className="landing__hero__copy__text">
            Create and sell memes together.
          </p>
          <div className="landing__hero__copy__buttons">
            <Link to="/create">
              <button
                type="button"
                className="btn btn-secondary theta"
              >
                Create
              </button>
            </Link>
            <Link to="/buy">
              <button
                type="button"
                className="btn btn-tertiary theta"
              >
                Buy
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  </div>
);

Landing.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Landing.defaultProps = {
  isLoggedIn: false,
};

const mapState = state => ({
  isLoggedIn: state.threeBox.isLoggedIn,
});

export default withRouter(connect(mapState)(Landing));
