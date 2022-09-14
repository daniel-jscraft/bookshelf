import * as React from 'react'

function AppProvider({ children }) {
    return (
      <div>
        <h1>Ana are mere</h1>
        {children}
      </div>
    )
  }

export { AppProvider }
  