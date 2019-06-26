import React from 'react'
import matterhornLogo from './matterhorn.png'
import githubLogo from './github.png'


const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <img src={matterhornLogo} className='sidebar-logo matterhorn-logo' alt='Matterhorn Logo' />
      <img src={githubLogo} className='sidebar-logo github-logo' alt='GitHub Logo' />
    </div>
  )
}

export default Sidebar