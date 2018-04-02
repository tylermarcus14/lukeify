# lukeify

[![GitHub release](https://img.shields.io/github/release/lukeify/lukeify.svg)](https://github.com/lukeify/lukeify)
[![David](https://img.shields.io/david/lukeify/lukeify.svg)](https://github.com/lukeify/lukeify)
[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://lukeify.com)

![](angular/assets/images/lukeify.png)

Personal website including portfolio, skillset, and contact feature.

## User Instructions

To view, go to https://lukeify.com

## Getting started

Contained below are instructions on how to run this project for those who would like to fork this repository to build their own portfolio.

### Prerequisites

Ensure you have Node Package Manager, the [Angular CLI](https://cli.angular.io), as well as a remote server with the ability to start a node.js script. 

Additionally, please create a `config.json` file based off of the `config.example.json` sample provided and place it in the same directory.

### Installation

```
npm install angular-cli -g
git clone https://github.com/lukeify/lukeify.git
cd lukeify
npm install
```

### Building

Several scripts are provided for execution for ease of development:

* `front:dev`: Runs an Angular Hot Module Reloading environment at localhost:4200.
* `front:build`: Compiles the frontend using ahead of time compilation and minification to be served by our backend.
* `back:dev`: Watches for changes and compiles the typescript node server.
* `back:build`: Compiles the typescript node server.
* `back:run:dev`: Runs the server in a development environment.
* `back:run:prod`: Runs the server in a production environment.
* `back:service`: To be executed via cron at a user's desired frequency to gather tweets & instagram photos from their profile and store them locally to be served.

## Deployment

Push to GitHub, then from remote repository:

```
git clone https://github.com/lukeify/lukeify.git
npm install
npm run front:build
npm run back:build
```

Now ensure you have `./config.json` configured properly. Follow the exemplar configuration. Then, run `npm run back:run:prod` using your favorite keep-alive tool, such as forever.js.

To run the Twitter & Instagram updating functionality, schedule a cron to call `npm run back:service` at a frequency of your choosing. 

## Built With

* Node.js & express.js
* NPM
* Angular (TypeScript)
* Sass

## Versioning

This site adheres to [semantic versioning](https://semver.org).

## Author

Luke Davia.

## License

The design of this repository is licensed under the [MIT License](LICENSE). The name *lukeify*, and any content posted on this website are property of the author. For more on this license, [read the summary on tldrlegal.com](https://tldrlegal.com/license/mit-license).
