import React from 'react'
import TokenGenerator from './tokenGenerator'

function App() {
  return (
    <div id="container">
      <div id="passwordInfo">
        <h2>Test</h2>
        <a href="${account.WebsiteURL}">URL</a>
        <p>Username: Test</p>
        <p>Password: Test</p>
        <p>ID: Test</p>
        <button id="deleteButton_${account._id}">Delete</button>
        <button id="editButton_${account._id}">Edit</button>
      </div>
    </div>

  )
}

export default App
