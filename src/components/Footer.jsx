import React from 'react';
import { Link } from 'react-router-dom';

import GithubIconWhite from '../assets/GithubIconWhite.svg';
import MediumIconWhite from '../assets/MediumIconWhite.svg';
import Email from '../assets/EmailWhite.svg';
import Twitter from '../assets/twitterWhite.svg';
import Discord from '../assets/discordWhite.svg';
import * as routes from '../utils/routes';
import '../views/styles/Landing.css';
import './styles/Footer.css';

const Footer = () => (
  <div className="footer">

    <div className="footer__gutter">

      <ul className="footer__gutter__info">
        <a href="www.3box.io">
          <li>3Box 2018</li>
        </a>
      </ul>
    </div>

  </div>
);

export default Footer;