import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import fab from 'react-fabricjs';
import FabricLib from 'fabric'
import { SketchPicker } from 'react-color'

import { waitForMined, getMemes } from '../utils/smartContract';
import { FileSizeModal } from '../components/Modals';
import Kittie from '../assets/Kittie.gif'
import './styles/Create.css';

const fabric = FabricLib.fabric

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: true,
      showFileSizeModal: false,
      numberOfShares: 100,
      shareValue: 0,
      imageLoading: false,
      canvas: null,
      memeId: this.props.history.location.pathname.split('/')[2]
    };

  }

  componentDidMount() {
    const { wememeContract } = this.props;
    const { memeId } = this.state;
    let imageUrl;

    const canvas = new fabric.Canvas('c', {
      selection: false,
      uniScaleTransform: false,
      width: 600,
      height: 400
    });
    canvas.uniScaleTransform = true;
    this.setState({ canvas });

    if (wememeContract.content) {
      wememeContract.content.call(memeId, (e, content) => {
        imageUrl = content;
        fabric.Image.fromURL(content, function (img) {
          canvas.setBackgroundImage(content, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
            crossOrigin: 'anonymous'
          });
        });
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { wememeContract } = nextProps;
    const { memeId, canvas } = this.state;
    let imageUrl;

    if (wememeContract.content !== this.props.wememeContract.content) {
      wememeContract.content.call(memeId, (e, content) => {
        imageUrl = content;
        fabric.Image.fromURL(content, function (img) {
          canvas.setBackgroundImage(content, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
            crossOrigin: 'anonymous'
          });
        });
      })
    }
  }


  addText = () => {
    var newID = (new Date()).getTime().toString().substr(5);
    var text = new fabric.IText('Meme it uuup!', {
      fontFamily: 'arial black',
      left: 100,
      top: 100,
      myid: newID,
      objecttype: 'text'
    });

    this.state.canvas.add(text);
    this.addLayer(newID, 'text');
  }

  setTextParam = (param, value) => {
    var obj = this.state.canvas.getActiveObject();

    if (obj) {
      if (param == 'color') {
        obj.setColor(value);
      } else {
        obj.set(param, value);
      }
      this.state.canvas.renderAll();
    }
  }

  setTextValue = (value) => {
    var obj = this.state.canvas.getActiveObject();
    if (obj) {
      obj.setText(value);
      this.state.canvas.renderAll();
    }
  }

  saveToIpfs = buffer => window.fetch('https://ipfs.infura.io:5001/api/v0/add', {
    method: 'post',
    'Content-Type': 'multipart/form-data',
    body: buffer,
  });

  saveImage = async () => {
    // const image = this.state.canvas.toDataURL("image/png");
    const canvasElement = document.getElementById('c')
    return new Promise((resolve, reject) => {
      const image = canvasElement.toBlob(async (blob) => {
        console.log(blob)
        const formData = new FormData()
        formData.append('inputdata', blob, 'filename')
        const fetch = await this.saveToIpfs(formData);
        const returnedData = await fetch.json();
        const content = `https://ipfs.infura.io/ipfs/${returnedData.Hash}`;
        resolve(content)
      });
    })
  }

  addLayer = () => {

  }

  fontChange = (e) => {
    this.setTextParam('fontFamily', e.target.value)
  }

  onColorChange = (obj) => {
    this.setTextParam('color', obj.hex)
  }

  handleSlider = (e) => {
    const { wememeContract } = this.props;
    const { memeId } = this.state;
    const numberOfShares = e.target.value;

    wememeContract.priceToMint.call(memeId, numberOfShares, (err, price) => {
      const shareValue = web3.fromWei(price.toNumber(), 'ether') // eslint-disable-line no-undef
      this.setState({ numberOfShares, shareValue });
    })
  }

  updateMeme = async () => {
    const { buffer, numberOfShares, memeId } = this.state;
    const { wememeContract, address, history } = this.props;

    const content = await this.saveImage();

    wememeContract.priceToMint.call(memeId, numberOfShares, (e, price) => {
      wememeContract.meme(memeId, numberOfShares, content, {
        from: address,
        value: price
      }, (e, txHash) => {
        // push user to home page
        this.setState({ imageLoading: true });
        waitForMined(txHash).then(res => {
          this.setState({ imageLoading: false })
          getMemes();
          history.push('/');
        });
      })
    })
  }

  render() {
    const { disableSave, showFileSizeModal, numberOfShares, shareValue } = this.state;

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
          <div className="canvas__canvas">
            <canvas
              id="c"
            // className="canvas" 
            />
          </div>

          <div className="canvas__controls">

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
              {/* <img src={Kittie} alt="" /> */}
              <button id="add" type="button" onClick={this.addText.bind(this)}>add</button>

              <select class="select2 font-change" data-type="fontFamily" onChange={this.fontChange.bind(this)}>
                <option value="Arial">Arial</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Impact">Impact</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>

              <SketchPicker onChange={this.onColorChange} />
            </div>

            <div>
              {/* <Link to="/draw" className="canvas__save"> */}
              <button
                type="submit"
                className="canvas__save"
                // disabled={disableSave}
                onClick={() => this.updateMeme()}
              >
                Submit
            </button>

              {/* </Link> */}
            </div>
          </div>
        </div>

        <div className="meme__metaData">
        </div>
      </div>
    );
  }
}

Draw.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getActivity: PropTypes.func.isRequired,
  handleSignInBanner: PropTypes.func.isRequired,
  pathname: PropTypes.object,
  wememeContract: PropTypes.object,
  location: PropTypes.object,
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


// var imageLoader = document.getElementById('imageLoader');
// var canvas = new fabric.Canvas('c', {
//   selection: false,
//   uniScaleTransform: true
// });
// canvas.uniScaleTransform = true;

// var appObject = function() {
//
//   return {
//     __canvas: canvas,
//     __tmpgroup: {},
//
//     addText: function() {
//       var newID = (new Date()).getTime().toString().substr(5);
//       var text = new fabric.IText('текст', {
//         fontFamily: 'arial black',
//         left: 100,
//         top: 100,
//         myid: newID,
//         objecttype: 'text'
//       });
//
//       this.__canvas.add(text);
//       this.addLayer(newID, 'text');
//     },
//     setTextParam: function(param, value) {
//       var obj = this.__canvas.getActiveObject();
//       if (obj) {
//         if (param == 'color') {
//           obj.setColor(value);
//         } else {
//           obj.set(param, value);
//         }
//         this.__canvas.renderAll();
//       }
//     },
//     setTextValue: function(value) {
//       var obj = this.__canvas.getActiveObject();
//       if (obj) {
//         obj.setText(value);
//         this.__canvas.renderAll();
//       }
//     },
//     addLayer: function() {
//
//     }
//
//   };
// }

// $(document).ready(function() {
//
//   var app = appObject();
//
//   $('.font-change').change(function(event) {
//     app.setTextParam($(this).data('type'), $(this).find('option:selected').val());
//   });
//
//   $('#add').click(function() {
//     app.addText();
//   });
//   $('#text-cont').keyup(function() {
//     app.setTextValue($(this).val());
//   })
//
// })
