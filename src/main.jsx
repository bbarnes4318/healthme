import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from '@/pages/Landing'
import '@/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

// Same storage key app-params.js uses for the Base44 session token.
function hasSession() {
  try {
    return Boolean(new URLSearchParams(window.location.search).get('access_token') || localStorage.getItem('base44_access_token'))
  } catch {
    return false
  }
}

// Logged-out visitors at "/" get the marketing page without downloading the app.
if (window.location.pathname === '/' && !hasSession()) {
  root.render(<Landing />)
} else {
  Promise.all([
    import('@/App.jsx'),
    import('@/context/FamilyMemberContext'),
    import('@/components/ErrorBoundary'),
  ]).then(([{ default: App }, { FamilyMemberProvider }, { default: ErrorBoundary }]) => {
    root.render(
      <ErrorBoundary>
        <FamilyMemberProvider>
          <App />
        </FamilyMemberProvider>
      </ErrorBoundary>
    )
  })
}
