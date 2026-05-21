import React from 'react'
import ReactDOM from 'react-dom/client'
import {Studio} from 'sanity'
import config from '../sanity.config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Studio config={config} />
  </React.StrictMode>,
)
