import * as React from 'react'
import {CircleButton, Input, Button} from './lib'

const LoginForm = function({onSubmit}) {

    const handeSubmit = (event)=> {
        event.preventDefault()
        const {username, password} = event.target.elements
        onSubmit({
            username: username.value,
            password: password.value,
        })
    }

    return (<form onSubmit={handeSubmit}>
        <div>
            <label htmlFor="uname"><b>username</b></label>
            <Input type="text" placeholder="Enter Username" name="username" required />
        </div>
        <div>
            <label htmlFor="password"><b>Password</b></label>
            <Input type="password" placeholder="Enter Password" name="password" required />
        </div>
        <Button type="submit">Login</Button>
    </form>)
}

export {LoginForm}