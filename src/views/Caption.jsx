import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import fab from 'react-fabricjs';
import FabricLib from 'fabric'
import { SketchPicker } from 'react-color'


import { FileSizeModal } from '../components/Modals';
import './styles/Create.css';

const fabric = FabricLib.fabric

class Draw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: true,
      showFileSizeModal: false,
      canvas: null
    };
  }

  componentDidMount() {
    // const canvas = new fabric.Canvas('c');

    const canvas = new fabric.Canvas('c', {
      selection: false,
      uniScaleTransform: true,
      width: 600,
      height: 400
    });
    canvas.uniScaleTransform = true;
    // console.log(canvas)
    this.setState({ canvas });

    const imageUrl = "https://ipfs.infura.io/ipfs/Qmci55ieQdt8qZv5B9KuTotnsuqSUKMdmMPmjsS2x5U1pB"
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
  }

  addText = () => {
    var newID = (new Date()).getTime().toString().substr(5);
    var text = new fabric.IText('Time to meme!', {
      fontFamily: 'arial black',
      left: 100,
      top: 100,
      myid: newID,
      objecttype: 'text'
    });

    this.state.canvas.add(text);
    this.addLayer(newID, 'text');
  }

  setTextParam =   (param, value) => {
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

  setTextValue =  (value) => {
    var obj = this.state.canvas.getActiveObject();
    if (obj) {
      obj.setText(value);
      this.state.canvas.renderAll();
    }
  }

  saveImage = () => {
    // puts layered canvases together and exports img string
    // const canvasItems = document.getElementsByTagName('canvas')
    // const base = canvasItems[3]
    // const contextBase = base.getContext("2d");
    // const layer1 = canvasItems[2]
    // const layer2 = canvasItems[2]
    // contextBase.drawImage(layer1, 0, 0);
    // contextBase.drawImage(layer2, 0, 0);
    // const image = base.toDataURL("image/png");
    // console.log(image)
    // TODO upload to ipfs and get hash
    const image = this.state.canvas.toDataURL("image/png");
    console.log(image)
  }

  addLayer = () => {

  }

  fontChange = (e) => {
    console.log(e.target.value)
    this.setTextParam('fontFamily', e.target.value)
    // console.log('asdfsadf')
  }

  onColorChange = (obj) => {
    this.setTextParam('color', obj.hex)
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
          <div>
            <canvas id="c" />
          </div>
        </div>

        <button id="add" type="button" onClick={this.addText.bind(this)}>add</button>

        <select class="select2 font-change" data-type="fontFamily" onChange={this.fontChange.bind(this)}>
  <option value="Arial">Arial</option>
  <option value="Arial Black">Arial Black</option>
  <option value="Impact">Impact</option>
  <option value="Tahoma">Tahoma</option>
  <option value="Times New Roman">Times New Roman</option>
</select>

  <SketchPicker onChange={this.onColorChange}/>

  <button onClick={this.saveImage.bind(this)}> save </button>

        <Link to="/sell">
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
