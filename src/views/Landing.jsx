import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import Meme from '../assets/ethereum-meme.jpg';
import SquareYellow from '../assets/Square-Yellow.svg';
import CircleBlue from '../assets/Circle-Blue.svg';
import TriangleGreen from '../assets/Triangle-Green.svg';
import Pencil from '../assets/Pencil.svg';
import EthereumCash from '../assets/EthereumCash.svg';
import MemeTile from '../components/MemeTile';
import './styles/Landing.css';
import '../components/styles/Nav.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { forDraw, forCaption } = this.props;

    return (
      <div className="landing">

        <div className="landing__hero">
          <img src={SquareYellow} alt="" className="shapes SquareYellow" />
          <img src={CircleBlue} alt="" className="shapes CircleBlue" />
          <img src={TriangleGreen} alt="" className="shapes TriangleGreen" />

          <div className="landing__hero__copy">
            <h1 className="landing__hero__copy__tagline">WeMeme</h1>
            <p className="landing__hero__copy__text">
              Create memes together and earn when they sell.
      </p>
            <p>
              1. Upload an image
      </p>
            <p>
              2. Someone else draws on the image and buys shares
      </p>
            <p>
              3. Someone else captions the image
      </p>
            <div className="landing__hero__copy__buttons">
              <Link to="/create">
                <button
                  type="button"
                  className="btn btn-secondary theta"
                >
                  <img src={Pencil} alt="" className="landing__button__icon" />
                  Create
          </button>
              </Link>
              <Link to="/buy">
                <button
                  type="button"
                  className="btn btn-tertiary theta"
                >
                  <img src={EthereumCash} alt="" className="landing__button__icon" />
                  Buy
          </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="landing__draw purple">
          <h2>Wanna draw?</h2>
          <div className="landing__draw__slideshow">
            {forDraw.map((meme, i) => (
              <MemeTile key={i} meme={meme} />
            ))}
          </div>
        </div>
        <div className="landing__draw">
          <h2>Wanna caption?</h2>
          <div className="landing__draw__slideshow">
            {forCaption.map((meme, i) => (
              <MemeTile key={i} meme={meme} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  forDraw: PropTypes.array,
  forCaption: PropTypes.array,
};

Landing.defaultProps = {
  isLoggedIn: false,
  forDraw: [],
  forCaption: [],
};

const mapState = state => ({
  isLoggedIn: state.threeBox.isLoggedIn,
  forDraw: state.threeBox.forDraw,
  forCaption: state.threeBox.forCaption,
});

export default withRouter(connect(mapState)(Landing));
