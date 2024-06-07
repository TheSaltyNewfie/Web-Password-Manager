import React, { useState } from 'react'
import axios from 'axios'

const TokenGenerator = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const handleGenerateToken = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/token', {
        Username: username,
        Password: password
      })

      setToken(response.data.token)
      setError('')
    } catch (error) {
      setToken('')
      setError(error.response ? error.response.data.error : 'Error generating token')
    }
  }

  return (
    <div>
      <h1>Generate Token</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleGenerateToken}>Generate Token</button>
      {token && <div>Token: {token}</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  )
}

export default TokenGenerator
