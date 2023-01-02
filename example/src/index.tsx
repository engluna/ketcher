import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'url-search-params-polyfill'
import './index.css'
import ReactDOM from 'react-dom'
import App from './App'

// @ts-ignore
import { KetcherCall } from 'ketcher-react'

ReactDOM.render(<App />, document.getElementById('root'))

const quanmoKetcher = new KetcherCall()

;(window as any).quanmoKetcher = quanmoKetcher
