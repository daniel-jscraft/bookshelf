/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
    const [user, setUser] = React.useState()

    const doRegister = (credentials) => auth.register(credentials).then(u => setUser(u))
    const doLogin = (credentials) => auth.login(credentials).then(u => setUser(u))

    const doLogout = () => auth.logout().then( () => setUser(null) )
    
    return (
        user ? 
            <AuthenticatedApp user={user} logout={doLogout} /> : 
            <UnauthenticatedApp register={doRegister} login={doLogin} />
    )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
