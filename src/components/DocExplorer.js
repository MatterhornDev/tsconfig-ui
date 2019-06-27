import React from 'react'

const DocExplorer = ({ selectedKey }) => {
  return (
    <div className='docExplorer-container'>
      <h1>{selectedKey || 'Select a key'}</h1>
      <p>I don't do anything just yet, but in the future I'll make GET requests to tsconfig-api to get documentation details on the TypeScript configuration property you just selected - <span role='img' aria-label='ghost emoji'>👻</span></p>
    </div>
  )
}

export default DocExplorer