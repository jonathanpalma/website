const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Full Stack Developer',
    description: `Full stack & mobile developer using React / React Native, Redux, NodeJS, Bootstrap. Jonathan Palma's personal website.`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        assets: path.join(__dirname, 'src/assets'),
        css: path.join(__dirname, 'src/css'),
        components: path.join(__dirname, 'src/components'),
        pages: path.join(__dirname, 'src/pages')
      }
    }
  ]
}