import React from 'react';
import { Link } from 'react-router-dom';

import Meme from '../assets/ethereum-meme.jpg'

const MemeTile = ({ meme }) => (
  <Link to={`/caption/${meme.id}`}>
    <div className="meme__tile">
      <div className="meme__tile__image--wrapper">
        <img src={meme.content} alt="" className="meme__tile__image" />
      </div>
      <div className="meme__tile__info">
        <h3>#{meme.id}</h3>
        <p>{meme.staked} Wei</p>
        <button type="button">
          {meme.step}
        </button>
      </div>
    </div>
  </Link>
);

export default MemeTile;
