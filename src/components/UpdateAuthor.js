import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTH, GET_AUTHORS } from './queries'

const UpdateAuthor = () => {
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [setAuthorBirth] = useMutation(SET_BIRTH, {
        refetchQueries: [{ query: GET_AUTHORS }]
    })

    const submit = event => {
        event.preventDefault()

        setAuthorBirth({ variables: { name, setBornTo: Number(birth) } })

        setName('')
        setBirth('')
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <input value={name} onChange={({ target }) => setName(target.value)} /><br />
                <input value={birth} maxLength="4" onChange={({ target }) => !isNaN(target.value) && setBirth(target.value)} /><br />
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default UpdateAuthor