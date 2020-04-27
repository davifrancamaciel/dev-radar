import React, { useEffect, useState } from 'react'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

import api from './services/api'

/*
  Componente -> Bloco isolado de HTML, CSS e JS o qual não interfere no resto da aplicação
  Estado -> 
  Propriedade -> 
*/
function App () {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs () {
      const response = await api.get('/devs')
      console.log(response.data.devs)
      setDevs(response.data.devs)
    }
    loadDevs()
  }, [])

  async function handleAdddev (data) {
    
    const response = await api.post('/devs', data)
    console.log(response.data)
    
    setDevs([...devs, response.data.dev])
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAdddev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev._id} />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
