import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from 'components/logo'

const App = function() {
    return <Logo />
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}