import React from 'react'
// eslint-disable-next-line camelcase
import {unstable_createRoot} from 'react-dom'

import App from './App.client'

const root = unstable_createRoot(document.getElementById('root'))
root.render(<App />)
