import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import ErrorBoundary from './components/ErrorBoundary.jsx'

export default function Main() {
  return (
    <ErrorBoundary>
      <Analytics />
      <App />
    </ErrorBoundary>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Main />)