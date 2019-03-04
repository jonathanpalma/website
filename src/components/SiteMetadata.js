import React from 'react';
import { Helmet } from 'react-helmet';

const SiteMetadata = () => (
  <Helmet>
    <meta
      name="description"
      content="Full stack & mobile developer using React / React Native, Redux, NodeJS, Bootstrap. Jonathan Palma's personal website"
    />
    <meta name="keywords" content="React,Redux,Javascript,RESTful,Fullstack,Developer,ES6" />
    <meta name="author" content="Jonathan Palma" />
    <meta property="og:site_name" content="Jonathan Palma - Full Stack Developer" />
    <title>Full Stack Developer</title>
  </Helmet>
);

export default SiteMetadata;
