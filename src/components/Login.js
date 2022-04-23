import React, { useState, useEffect } from 'react'
import { LOGIN_FORM } from './queries'
import { useMutation } from '@apollo/client'

function Login({ loginStat }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggingIn, result] = useMutation(LOGIN_FORM)

    useEffect(() => {
        if (result.data && result.data.login) {
            window.localStorage.setItem('loggedInUser', JSON.stringify({ username, token: result.data.login.value }))
            loginStat(true)
        }
    }, [result.data])

    const submit = async (e) => {
        e.preventDefault()
        loggingIn({ variables: { loginUsername2: username, password } })
    }

    return (
        <div>
            <h2>Login Form</h2>
            {result.loading && <h3>Loading...</h3>}
            <form onSubmit={submit}>
                <label>username: </label>
                <input value={username} onChange={({ target }) => setUsername(target.value.trim())} /><br />
                <label>password: </label>
                <input type="password" value={password} onChange={({ target }) => setPassword(target.value.trim())} /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login