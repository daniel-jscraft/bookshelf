import * as React from 'react'
import { useState } from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from 'components/logo'
import '@reach/dialog/styles.css'
import {Dialog} from '@reach/dialog'

const OPEN_MODAL_REGISTER = 'register_open_modal'
const OPEN_MODAL_LOGIN = 'login_open_modal'  

const App = function() {
    const [openModal, setOpenModal] = useState('')

    const closeModals = () => setOpenModal('')

    return (<>
        <Logo />
        <div>
            <button onClick={() => setOpenModal(OPEN_MODAL_LOGIN)}>Login</button>
            <button onClick={() => setOpenModal(OPEN_MODAL_REGISTER)}>Register</button>
        </div>

        <Dialog isOpen={openModal === OPEN_MODAL_REGISTER} onDismiss={closeModals}>
            <button className="close-button" onClick={closeModals}>
                <span aria-hidden>×</span>
            </button>
            <p>Register HERE</p>
        </Dialog>

        <Dialog isOpen={openModal === OPEN_MODAL_LOGIN} onDismiss={closeModals}>
            <button className="close-button" onClick={closeModals}>
                <span aria-hidden>×</span>
            </button>
            <p>Login HERE</p>
        </Dialog>
    </>)
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}