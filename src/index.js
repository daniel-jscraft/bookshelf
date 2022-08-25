import * as React from 'react'
import { useState } from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from 'components/logo'
import {LoginForm} from 'components/login-form'
import {Dialog, CircleButton} from 'components/lib'



const OPEN_MODAL_REGISTER = 'register_open_modal'
const OPEN_MODAL_LOGIN = 'login_open_modal'  

const App = function() {
    const [openModal, setOpenModal] = useState('none')

    const closeModals = () => setOpenModal('none')

    const login = (data) => {
        console.log("----------")
        console.log(data)
    }

    return (<>
        <Logo />
        <div>
            <button onClick={() => setOpenModal(OPEN_MODAL_LOGIN)}>Login</button>
            <button onClick={() => setOpenModal(OPEN_MODAL_REGISTER)}>Register</button>
        </div>

        <Dialog isOpen={openModal === OPEN_MODAL_REGISTER} onDismiss={closeModals}>
            <CircleButton aria-hidden onClick={closeModals}>x</CircleButton>
            <p>Register HERE</p>
        </Dialog>

        <Dialog isOpen={openModal === OPEN_MODAL_LOGIN} onDismiss={closeModals}>
            <CircleButton aria-hidden onClick={closeModals}>x</CircleButton>
            <LoginForm onSubmit={login} />
        </Dialog>
    </>)
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}