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
      memeId: this.props.history.location.pathname.split('/')[2],
      imgSrc: null
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
    const layer1 = canvasItems[1]
    const layer2 = canvasItems[2]
    console.log(contextBase)
    contextBase.drawImage(layer1, 0, 0);
    contextBase.drawImage(layer2, 0, 0);
    // const image = base.toDataURL("image/png");
    const image = base.toBlob(async (blob) => {
      console.log(blob)
      const formData = new FormData()
      formData.append('inputdata', blob, 'filename')
      const fetch = await this.saveToIpfs(formData);
      const returnedData = await fetch.json();
      const content = `https://ipfs.infura.io/ipfs/${returnedData.Hash}`;
      console.log(content)
    });
    // console.log(image)
    // TODO upload to ipfs and get hash
  }

  saveToIpfs = buffer => window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
    method: 'post',
    'Content-Type': 'multipart/form-data',
    body: buffer,
  });

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

  changeBackground = (img) => {
    // this.setState({ imgSrc: img });
    const canvasItems = document.getElementsByTagName('canvas')
    const base = canvasItems[3]
    const contextBase = base.getContext("2d");
    const background = new Image();
    background.crossOrigin = 'anonymous'
    background.src = img
    const that = this
    background.onload = function(){
      that.drawImageProp({ctx: contextBase, img: background})
    }
  }

  drawImageProp = ({ctx, img, x, y, w, h, offsetX, offsetY} = {}) => {
    // Defaults
    if (typeof x !== "number") x = 0;
    if (typeof y !== "number") y = 0;
    if (typeof w !== "number") w = ctx.canvas.width;
    if (typeof h !== "number") h = ctx.canvas.height;
    if (typeof offsetX !== "number") offsetX = 0.5;
    if (typeof offsetY !== "number") offsetY = 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r, // new prop. width
      nh = ih * r, // new prop. height
      cx,
      cy,
      cw,
      ch,
      ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
  }

  componentWillReceiveProps(nextProps) {
    const { wememeContract } = nextProps;
    const { memeId, canvas } = this.state;
    let imageUrl;

    const that = this
    console.log('youoo')
    wememeContract.content.call(memeId, (e, content) => {
      this.changeBackground(content)
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
