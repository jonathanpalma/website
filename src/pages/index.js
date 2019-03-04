import React, { Fragment } from 'react';
import SiteMetadata from 'components/SiteMetadata';
import FontAwesome from 'react-fontawesome';

import 'css/index.css';
import 'css/font-awesome.min.css';

const App = () => (
  <Fragment>
    <SiteMetadata />
    <div className="content">
      <h1 className="title">Jonathan Palma</h1>
      <h3 className="subtitle">Full Stack Developer</h3>
      <span className="separator" />
      <p>
        Hi! I am Jonathan, a full stack developer with over 5 years of
        {' '}
        experience based in El Salvador, Central America. I have worked
        {' '}
        for startups, mid-size and multinational companies, and collaborated
        {' '}
        with talented people to create digital products for both business and
        {' '}
        consumer use. I'm quietly confident and passionate about what I do and
        {' '}
        I find happiness in dancing, surfing, coding and looking for new challenges.
      </p>
      <ul className="bar-menu">
        <li>
          <a
            href="https://github.com/jonathanpalma"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="github" />
            {' '}
            Github
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/jonathan-palma-8a2a0490"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesome name="linkedin" />
            {' '}
            Linkedin
          </a>
        </li>
        <li>
          <a href="#" download>
            <FontAwesome name="download" />
            {' '}
            Download CV
          </a>
        </li>
      </ul>
    </div>
  </Fragment>
);

export default App;
