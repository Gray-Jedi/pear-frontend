import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, PasswordMessage }from '../components/Message'; // Error handling
import Loader from '../components/Loader';  // Error handling
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions'


function RegisterScreen({location, history}) {
    
    const [name, setName] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log('clicked')

        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else {
            dispatch(register(name, email, password))
        }
    }
    return (
        
        <FormContainer>
            <h1>Sign In</h1>
             {message && <PasswordMessage variant='danger'>{error}</PasswordMessage>}
             {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
             {loading && <Loader />}
             <Form onSubmit={submitHandler}>
             <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>

                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
             </Form>
 
        </FormContainer>
    )
}

export default RegisterScreen
