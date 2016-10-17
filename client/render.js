import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import { ContextProvider } from './utils/context';
import { dehydrate } from './utils/hydrate';
import { fetchData } from './utils/fetch';
import initStore from './utils/store';

import createRoutes from './routes'

const routes = createRoutes()

const renderFullPage = (html, state) => {
  return `
      <!DOCTYPE html>
      <html>
          <head>
              <meta charset="utf-8">
              <title>MobX Test</title>
              <link href="http://localhost:8080/bundle.css" rel="stylesheet"/>
              <script>
                  window.__STATE = ${ state };
              </script>
          </head>
          <body>
              <div id="root">${html}</div>
              <script type="application/javascript" src="http://localhost:8080/bundle.js"></script>
          </body>
      </html>
  `
}

function handleRouter(req, res, props) {

  const store = initStore({
    app: { ssrLocation: req.url },
  })

  fetchData(store, props.components, props.params, props.location.query)
    .then(() => {
      const initialView = ReactDOMServer.renderToStaticMarkup(<ContextProvider context={{ store }}><RouterContext {...props} /></ContextProvider>)
      const finalState = JSON.stringify(dehydrate(store))
      return res.end(renderFullPage(initialView, finalState))
    })
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
  res.status(500).send(err.message);
}

export default (req, res) => {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err);
      else if (redirect) handleRedirect(res, redirect);
      else if (props) handleRouter(req, res, props);
      else handleNotFound(res);
    });
}
