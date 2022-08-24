import * as React from 'react'


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
            <input type="text" placeholder="Enter Username" name="username" required />
        </div>
        <div>
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />
        </div>
        <button type="submit">Login</button>
    </form>)
}

export {LoginForm}