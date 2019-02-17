import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from 'react-color'

import { FileSizeModal } from '../components/Modals';
import './styles/Create.css';

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: true,
      showFileSizeModal: false,
      color: "#000000",
      width: 400,
      height: 400,
      numberOfShares: 100,
      shareValue: 0,
      brushRadius: 10,
      lazyRadius: 12,
      memeId: this.props.history.location.pathname.split('/')[2]
      // TODO maybe some cross origin issues here to work out
      // imgSrc:"https://ipfs.infura.io/ipfs/Qmci55ieQdt8qZv5B9KuTotnsuqSUKMdmMPmjsS2x5U1pB"
    };
  }

  chooseColor = (color) => {
    this.setState({ showFileSizeModal: false });
  }

  drawUndo = () => {
    this.saveableCanvas.undo();
  }

  saveImage = () => {
    // puts layered canvases together and exports img string
    const canvasItems = document.getElementsByTagName('canvas')
    const base = canvasItems[3]
    const contextBase = base.getContext("2d");
    const layer1 = canvasItems[2]
    const layer2 = canvasItems[2]
    contextBase.drawImage(layer1, 0, 0);
    contextBase.drawImage(layer2, 0, 0);
    const image = base.toDataURL("image/png");
    console.log(image)
    // TODO upload to ipfs and get hash
  }

  onColorChange = (obj) => {
    this.setState({ color: obj.hex })
  }

  chooseWeight = (weight) => () => {
    console.log(weight)
    if (weight === 'small') {
      this.setState({ brushRadius: 5 })
      return
    }
    if (weight === 'medium') {
      this.setState({ brushRadius: 10 })
      return
    }
    if (weight === 'large') {
      this.setState({ brushRadius: 15 })
      return
    }
  }

  componentWillReceiveProps(nextProps) {
    const { wememeContract } = nextProps;
    const { memeId, canvas } = this.state;
    let imageUrl;

    wememeContract.content.call(memeId, (e, content) => {
      imageUrl = content;
      // const imageUrl = "https://ipfs.infura.io/ipfs/Qmci55ieQdt8qZv5B9KuTotnsuqSUKMdmMPmjsS2x5U1pB"
      canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
        // backgroundImageOpacity: 0.5,
        // should the image be resized to fit the container?
        // TODO not working....??
        backgroundImageStreftch: true,
        opacity: 0.5,
        width: canvas.width,
        height: canvas.height,
        // angle: 45,
        // left: 400,
        // top: 400,
        originX: 'left',
        originY: 'top',
        crossOrigin: 'anonymous'
      });
    })
  }

  render() {
    return (
      <div className="createPage">

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
            <div className="progress__bar grey" />
          </div>
        </div>


        <div className="canvas__wrapper">

          <CanvasDraw
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.canvasWidth}
            canvasHeight={this.state.canvasHeight}
            imgSrc={this.state.imgSrc}
          />


        </div>

        <button onClick={this.chooseWeight('small')}> Small </button>
        <button onClick={this.chooseWeight('medium')}> Medium </button>
        <button onClick={this.chooseWeight('large')}> Large </button>



        <SketchPicker onChange={this.onColorChange} />

        <button onClick={this.drawUndo.bind(this)}> undo </button>

        <button onClick={this.saveImage.bind(this)}> save </button>


        <Link to="/caption">
          <button
            type="submit"
          // disabled={disableSave}
          >
            Save
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
  wememeContract: PropTypes.object,
  isLoadingPublicProfile: PropTypes.bool,
  showSignInBanner: PropTypes.bool,
  currentAddress: PropTypes.string,
};

Draw.defaultProps = {
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
  })(Draw));
