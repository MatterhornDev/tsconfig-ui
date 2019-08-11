import React from 'react'
import matterhornLogo from './matterhorn.png'
import githubLogo from './github.png'
import download from './download.png'
import reset from './reset.png'
import save from './save.png'

const Sidebar = ({ handleDownload, handleReset, handleSave }) => {
  return (
    <div className='sidebar-container'>
      <a 
        className='sidebar-logo matterhorn-logo'
        href='https://github.com/MatterhornDev/'
      >
        <img src={matterhornLogo} alt='Matterhorn Logo' />
      </a>
      <button className='sidebar-logo reset-button' onClick={() => handleReset()}>
        <img src={reset} alt='Reset Config' />
      </button>
      <button className='sidebar-logo save-button' onClick={() => handleSave()}>
        <img src={save} alt='Save Config' />
      </button>
      <button className='sidebar-logo download-button' onClick={() => handleDownload()}>
        <img src={download} alt='Download Config' />
      </button>
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