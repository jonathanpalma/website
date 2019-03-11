import React from 'react';
import { Helmet } from 'react-helmet';

const SiteMetadata = () => (
  <Helmet>
    <meta
      name="description"
      content="Full stack & mobile developer using React / React Native, Redux, NodeJS, Bootstrap. Jonathan Palma's personal website"
    />
    <meta name="keywords" content="React,Redux,Javascript,RESTful,Fullstack,Developer,ES6" />
    <meta name="author" content="Jonathan Alexander Palma Flores <tanpalma04@gmail.com> (http://jonathanpalma.me)" />
    <meta property="og:site_name" content="Jonathan Palma - Full Stack Developer" />
    <meta name="theme-color" content="#060a49" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>Full Stack Developer</title>
  </Helmet>
);

export default SiteMetadata;
