import React from 'react';
import { Link } from 'react-router-dom';

const MemeTile = ({ meme }) => (
  <Link to={`/${meme.step}/${meme.id}`}>
    <div className="meme__tile">
      <div className="meme__tile__image--wrapper">
        <img src={meme.content} alt="" className="meme__tile__image" />
      </div>
      <div className="meme__tile__info">
        <h3>#{meme.id}</h3>
        <p>{meme.staked} Wei</p>
        <button type="button">
          {meme.step !== 'gallery'
            ? meme.step
            : 'view'}
        </button>
      </div>
    </div>
  </Link>
);

export default MemeTile;
