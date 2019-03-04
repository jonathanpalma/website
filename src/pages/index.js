import React, { Fragment } from 'react';
import SiteMetadata from 'components/SiteMetadata';
import Menu from 'components/Menu';

import 'css/index.css';
import 'css/font-awesome.min.css';

const App = () => (
  <Fragment>
    <SiteMetadata />
    <div className="content">
      <h1 className="title">Jonathan <span className="last-name">Palma</span></h1>
      <h2 className="subtitle">Full Stack Developer</h2>
      <span className="separator" />
      <p className="bio">
        Hi! I am Jonathan, a full stack developer with over 5 years of
        experience based in El Salvador, Central America. I have worked
        for startups, mid-sized and multinational companies, and collaborated
        with talented people to create digital products for both business and
        consumer use. I'm quietly confident and passionate about what I do and
        I find happiness in dancing, surfing, coding and looking for new challenges.
      </p>
      <Menu>
        <Menu.Option
          icon="github"
          label="Github"
          url="https://github.com/jonathanpalma"
        />
        <Menu.Option
          icon="linkedin"
          label="Linkedin"
          url="https://linkedin.com/in/jonathan-palma-8a2a0490"
        />
        <Menu.Option
          icon="envelope"
          label="Contact"
          target="_top"
          url="mailto:tanpalma04@gmail.com"
        />
        <Menu.Option
          icon="file-text"
          label="Resume"
          url="#"
        />
      </Menu>
    </div>
  </Fragment>
);

export default App;