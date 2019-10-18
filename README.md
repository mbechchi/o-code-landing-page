# **O°Code Landing Page**
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

<br />

## Table of Contents
- [Getting Started](#getting-started)
- [Production build](#production-build)
- [App Structure](#app-structure)
- [Add Translation](#add-translation)

## Getting Started
* [Download the installer](https://nodejs.org/) for Node.js 8.9.3 or greater.
* [Install](https://sass-lang.com/install) Sass.
* Run `npm install` from the project root.
* Run `npm run start` in a terminal from the project root.
* Enjoy. :tada:

## Production Build
* Run `npm run build` from the project root.
* Find files in `public/` folder.


## App Structure
    .
    ├── node_modules            # NPM dependencies
    ├── public                  # Compiled files
    ├── src                     # Compiled files
    │   ├── assets              # Fonts, icons, images, stylesheets
    │   ├── i18n                # Translations
    │   ├── layouts             # Base and navbar templates
    │   ├── pages               
    │   │    ├── home           # home templates, stylesheets
    │   │    └── ...
    │   ├── theme               # Components, fonts, variables stylesheets
    │   ├── app.ts              # App entry point for scripts
    │   ├── manifest.json       # PWA manifest configuration
    │   └── style.scss          # App entry point for stylesheets
    ├── package.json            # NPM dependencies configuration
    ├── postcss.config.json     # Config to add autoprefixer for webpack
    ├── tsconfig.json           # Typescript configuration
    ├── webpack.config.json     # Webpack configuration
    └── README.md


## Add Translation
* Add your new translation `json` file in `src/i18n`.
* Open `webpack.config.js` and add new translation in `i18n` const.
* Run build and find translation in `public/${lang}/`.
