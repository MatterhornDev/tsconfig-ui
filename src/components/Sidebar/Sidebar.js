import React from 'react'
import matterhornLogo from './matterhorn.png'
import githubLogo from './github.png'


const Sidebar = () => {
  return (
    <div className='sidebar-container'>
      <a 
        className='sidebar-logo matterhorn-logo'
        href='https://github.com/MatterhornDev/'
      >
        <img src={matterhornLogo} alt='Matterhorn Logo' />
      </a>
      <a 
        className='sidebar-logo github-logo'
        href='https://github.com/MatterhornDev/tsconfig-ui'
      >
        <img src={githubLogo}  alt='GitHub Logo' />
      </a>
    </div>
  )
}

export default Sidebar