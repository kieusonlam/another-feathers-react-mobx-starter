import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, match } from 'react-router'

import { fetchDataOnLocationMatch } from './utils/fetch'
import { ContextProvider } from './utils/context'
import { rehydrate } from './utils/hydrate'
import createRoutes from './routes'

const routes = createRoutes()

// Import our styles
require('./assets/css/index.scss')

// Initialize stores
const store = rehydrate()

fetchDataOnLocationMatch(browserHistory, routes, match, store);

render(
  <ContextProvider context={{ store }}>
    <Router routes={routes} history={browserHistory} />
  </ContextProvider>,
  document.getElementById('root')
)
