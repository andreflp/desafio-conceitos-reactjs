import React, { useState, useEffect } from "react"
import api from './services/api'

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    handleListRepository()
  }, [])

  async function handleListRepository() {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      title: `Repositório ${Date.now()}` , 
      url: 'github.com/andreflp', 
      techs: ['NodeJS', 'ReactJS', 'React Navite']
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id)

    setRepositories(repositories.filter(repository => repository.id !== id))  
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  )
}

export default App
