/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import { FullPageSpinner } from 'components/lib'

function App() {
    const [user, setUser] = React.useState()
    const [tokenCheckLoading, setTokenCheckLoading] = React.useState()
    const doRegister = (credentials) => auth.register(credentials).then(u => setUser(u))
    const doLogin = (credentials) => auth.login(credentials).then(u => setUser(u))
    const doLogout = () => auth.logout().then( () => setUser(null) )

    const tokenCheck = async () => {
      const token = await auth.getToken()
      if(token) {
        auth.getUserByToken(token).then(u => {
          setUser(u)
          setTokenCheckLoading(false)
        })
      }
      else {
        setTokenCheckLoading(false)
      }
    }

    React.useEffect(() => {
      setTokenCheckLoading(true)
      tokenCheck()
    }, [])
    
    return (
      tokenCheckLoading ? 
        (<FullPageSpinner />) :
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
