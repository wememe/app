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
    <ul className="footer__gutter__info">
      <a href="www.3box.io">
        <li>Made with love by the 3Box team.</li>
      </a>
    </ul>
  </div>
);

export default Footer;