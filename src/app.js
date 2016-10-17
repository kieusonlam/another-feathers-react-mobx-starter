'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const feathers = require('feathers');
const configuration = require('feathers-configuration');

const api = require('./api');

const render = require('../client/render');

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/api', api)
  .use('/', serveStatic( app.get('public') ))
  .use(render);

module.exports = app;
