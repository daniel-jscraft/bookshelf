import styled from '@emotion/styled'
import {Dialog as ReachDialog} from '@reach/dialog'
import '@reach/dialog/styles.css'
import * as colors from '../styles/colors'
import * as mq from '../styles/media-queries'

const CircleButton = styled.button({
    borderRadius: '30px',
    padding: '0',
    width: '40px',
    height: '40px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    color: '#434449',
    border: `1px solid #f1f1f4`,
    cursor: 'pointer',
  })

const Dialog = styled(ReachDialog)({
    maxWidth: '450px',
    borderRadius: '3px',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    margin: '20vh auto',
    [mq.small] : {
        border: '10px solid red'
    }
})

const Input = styled.input({ 
    borderRadius: '3px',
    border: '1px solid #f1f1f4',
    background: '#f1f2f7',
    padding: '8px 12px',
})

const Button = styled.button(props => ({ 
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
    background: props.variant === 'secondary' ? colors.danger : colors.green,
    color: props.variant === 'secondary' ? 'white' : '#434449',
    cursor: 'pointer',
}))

const FormGroup = styled.div({
    margin: '1rem 0'
})

export {CircleButton, Dialog, Input, Button, FormGroup}