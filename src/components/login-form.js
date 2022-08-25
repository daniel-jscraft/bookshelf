import * as React from 'react'
import {Button, Input, FormGroup} from './lib'

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
        <FormGroup>
            <label htmlFor="uname"><b>Username: </b></label>
            <Input type="text" placeholder="Enter Username" name="username" required />
        </FormGroup>
        
        <FormGroup>
            <label htmlFor="password"><b>Password: </b></label>
            <Input type="password" placeholder="Enter Password" name="password" required />
        </FormGroup>
        <Button type="submit" variant="secondary"> Login </Button>
    </form>)
}

export {LoginForm}