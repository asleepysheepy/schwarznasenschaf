<div align="center">
  <img src="https://cdn.discordapp.com/avatars/535104206949056512/8c66f140efe40171d11a3cecfb59c9f6.png?size=1024" height="250" />
  <h1>Schwarznasenschaf Discord Bot</h1>

  <a href="https://github.com/asleepysheepy/Schwarznasenschaf/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/asleepysheepy/Schwarznasenschaf.svg?style=flat-square" alt="Github License" />
  </a>
   <a href="https://discord.gg/QEncbgV">
    <img src="https://img.shields.io/badge/Join%20the%20Transcoders-Discord-7289DA.svg?style=flat-square" alt="Join Transcoders" />
  </a>

  <br />
  <br />

  <p>Schwarznasenschaf is a general purpose discord bot written specifically for and used exclusively on the <a href="https://discord.gg/QEncbgV">Transcoders Discord server.</a></p>

  <hr />
</div>

## Table of Contents

* [Using Schwarznasenschaf](#using-Schwarznasenschaf)
* [Dependencies and frameworks](#Dependencies-and-frameworks)
* [Contributing to Schwarznasenschaf](#contributing-to-Schwarznasenschaf)
  * [Bug reports](#bug-reports)
  * [Developing Schwarznasenschaf](#developing-Schwarznasenschaf)
    * [Requirements](#requirements)
    * [Running Schwarznasenschaf for local development](#running-Schwarznasenschaf-for-local-development)
    * [`package.json` scripts](#package.json-scripts)
* [License](#license)

## Using Schwarznasenschaf

TODO: Write this

## Dependencies and frameworks

* [Discord.js](https://discord.js.org) - Discord API for Node.js
* [ESLint](https://eslint.org/) - Linting
* [Winston](https://github.com/winstonjs/winston) - Log management

## Contributing to Schwarznasenschaf

We welcome all contributors to Schwarznasenschaf.  Your pull requests will be reviewed by the authors prior to merging. Please document your code, and play nicely with other contributors.

### Bug reports

Please report bugs by opening an [issue](https://github.com/asleepysheepy/Schwarznasenschaf/issues) on GitHub.

### Developing Schwarznasenschaf

#### Requirements
* [Docker](https://www.docker.com/)/[Docker Compose](https://docs.docker.com/compose/)
* [Node.js](https://nodejs.org/en/) 14.0 or higher
* [Yarn](https://yarnpkg.com/)

#### Running Schwarznasenschaf for local development

<ol>
  <li>
    Clone the repo and move into the directory.
    <br>
    <pre>$ git clone https://github.com/asleepysheepy/Schwarznasenschaf.git schaf && cd schaf</pre>
  </li>
  <li>
    Install dependencies with yarn.
    <br>
    <pre>$ yarn install</pre>
  </li>
  <li>
    Create <code>.env</code> file.
    <br>
    <pre>$ cp .env.sample .env</pre>
  </li>
  <li>
    Setup your evironment variables in the <code>.env</code> file.
  </li>
  <li>
    Start Schwarznasenschaf.
    <br>
    <pre>$ yarn start</pre>
  </li>
</ol>

#### package.json scripts

* `yarn build` - Compiles Schwarznasenschaf's typeScript code into plain JavaScript
* `yarn lint:all` - Run eslint over Schwarznasenschaf's code
* `yarn lint:fix` - Run eslint over Schwarznasenschaf's code, fixing mistakes
* `yarn start` - Compile Schwarznasenschaf and start up the bot process

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
