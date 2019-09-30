const fr_FR = require('./i18n/fr-FR.json');

const pages = [
    {
      output: './index.html',
      content: {
        title: 'Home',
        description: 'Home Page'
      },
      template: './src/pages/home.hbs'
    }
];

module.exports = pages;
