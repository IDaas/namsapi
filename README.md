<p align="center"><img src="https://image.ibb.co/mMyMQ0/NodeGard.png" height="128" alt="NodeGard"></p>
<h3 align="center">NodeGard</h3>
<p align="center"><i>My own Node.JS Framework / Boilerplate</i><p>



<p align="center">
  <a href="https://forthebadge.com">
    <img src="https://forthebadge.com/images/badges/made-with-javascript.svg"
         alt="Javascript">
  </a>
  <a href="https://forthebadge.com">
      <img src="https://forthebadge.com/images/badges/powered-by-water.svg">
  </a>
  <a href="https://github.com/Leafgard/NodeGard/issues">
      <img src="https://img.shields.io/github/issues/Leafgard/NodeGard.svg?style=for-the-badge">
  </a>
  <a href="https://github.com/Leafgard/NodeGard/stargazers">
      <img src="https://img.shields.io/github/stars/Leafgard/NodeGard.svg?style=for-the-badge">
  </a>
  <a href="https://paypal.me/Leafgard">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=for-the-badge">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#testing">Testing</a> •
  <a href="#contribution">Contribution</a> •
  <a href="#built-with">Built With</a> •
  <a href="#license">License</a>
</p>

## Key Features

* Ability to choose between single and multi-core applications
* Works with separated modules
* Globally declared modules for inter-module communication (Ex: WebServer -> Database)
* .ENV configuration ready
* Pre-installed ExpressJS webserver
* Loading, preparing and running phases
* Easy-to-adapt modules

## Installation

```bash
$ git clone https://github.com/Leafgard/NodeGard.git yourProjectName && cd yourProjectName
$ npm i
```

### Updating `package.json`

Update `package.json` with your own information.

```diff
- "name": "nodegard",
+ "name": "yourpackagename",
  "version": "1.0.0",
- "description": "My own Node.JS Framework / Boilerplate",
+ "description": "Your package description",
  "main": "./src/app.js",
  "scripts": {
    "start": "node ./src/app.js",
    "test": "jest --detectOpenHandles --forceExit"
  },
  "repository": {
    "type": "git",
-   "url": "git+https://github.com/Leafgard/NodeGard.git"
+   "url": "git+https://github.com/yourName/yourRepository.git"
  },
- "author": "Yann SEGET <dev@leafgard.fr>",
+ "author": "Full NAME <yourName@mail.com>",
  "license": "MIT",
  "bugs": {
-   "url": "https://github.com/Leafgard/NodeGard/issues"
+   "url": "https://github.com/yourName/yourRepository/issues"
  },
- "homepage": "https://github.com/Leafgard/NodeGard#readme",
+ "homepage": "https://github.com/yourName/yourRepository#readme",
  "dependencies": {
    "dotenv": "^6.1.0",
    "express": "^4.16.4"
  },
  "devDependencies": {
    "jest": "^23.6.0"
  }
```

## Usage

### Configuring the application in `config.js`

#### Adding a module to the application:

By default, the application runs using the built-in WebServer.

```js
/**
 * All the modules should be declared here.
 * NB: Application won't run if empty !
 * 
 * WebServer is already declared here.
 * It's the built-in webserver provided by the framework.
 */
  module.exports.Modules = {
    'WebServer': require('./src/Modules/WebServer')
  }
```

You just have to add your own modules like this:

```diff
  module.exports.Modules = {
-    'WebServer': require('./src/Modules/WebServer')
+    'WebServer': require('./src/Modules/WebServer'),
+    'myModule': require('./src/Modules/MyModule')
  }
```

`myModule` is the keyname you can call throughout the whole application from all of your modules.

For example, if you have a `Database` module and you want to call one of its functions, you can just:

`Database.callMyFunction()` from anywhere in the app! And it will work, just like that!

`require('./src/Modules/..')` is the directory of your modules folder.

#### Single/Multi-Core applications

By default, applications will only run on a single core.

```js
/**
 * Ability to run on multiple cores:
 * true = Uses multiple cores
 * false = Uses only one core
 */
  module.exports.useMultipleCores = false
```
In order to allow your application to make use of multiple cores, you must set `module.exports.useMultipleCores` to `true`.

### Creating a module

This framework is based on modules.

All of your modules should be located in `./src/Modules/YourModule/index.js` (Each module has its own directory).

All modules should have this syntax:

```js
  module.exports = new ( class yourModule {

    /**
     * (Requires the packages and) Instantiate the main components and variables
     */
    constructor() {
      const express = require('express')
      this.app = express()
      this.webPort = process.env.WEB_PORT || 3000
      ...
    }

    /**
     * Prepares the module to be run (Settings, routes, etc..)
     * @returns {Promise} Resolve = module prepared, reject = problem while preparing module
     */
    prepare() {
      return new Promise((resolve, reject) => {
        this.app.get('/', (req, res) => {
          res.send('Hello World!')
        })
        ...
        resolve()
      })
    }

    /**
     * Runs the module (Listening, etc..)
     */
    run() {
      this.app.listen(this.webPort, () => {
        console.log(`Example app listening on port ${this.webPort}!`)
      })
      ...
    }

  } )
```

You **absolutely** need the `prepare()` and `run()` functions, and the `prepare()` function must return a *Promise*!

If there is a problem during `prepare()`, return `reject`, or else return `resolve`.

This *prevents* the application from running without everything working properly.

## Testing

Create tests (using JEST) in `./tests` and run:

```bash
$ npm test
```

## Contribution

* Fork the repository, use the development branch and please create pull requests to contribute to this project.
* Follow the same coding style as used in the project. Pay attention to the
  usage of tabs, spaces, newlines and brackets. Try to copy the aesthetics as
  best as you can.
* Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html),
  explain what your patch does, and why it is needed.
* Keep it simple: Any patch that changes a lot of code or is difficult to
  understand should be discussed before you put in the effort.

## Built With

* [dotenv](https://www.npmjs.com/package/dotenv)^6.1.0 - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
* [express](https://www.npmjs.com/package/express)^4.16.4 - Fast, unopinionated, minimalist web framework for node
* [jest](https://www.npmjs.com/package/jest)^23.6.0 - Delightful JavaScript Testing

## Members

* **Yann SEGET** - *Main author* - *dev@leafgard.fr*
* **Jonah WRIGHT** - *English-Language checker* - *jonah.wright@viacesi.fr*

[https://github.com/Leafgard/NodeGard](https://github.com/Leafgard/NodeGard)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
