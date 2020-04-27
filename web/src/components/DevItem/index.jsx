import React from 'react'
import './styles.css'

function DevItem ({ dev }) {
  return (
    <li className='dev-item' >
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className='user-info'>
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`} target='_blank'>
        Acessar peril no Github
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${dev.location.coordinates[1]},${dev.location.coordinates[0]}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Maps
      </a>
    </li>
  )
}
export default DevItem
