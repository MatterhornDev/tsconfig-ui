import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import ConfigEditor from './components/ConfigEditor'
import DocExplorer from './components/DocExplorer'

function App() {
  return (
    <div className='app-container'>
      <Sidebar />
      <ConfigEditor />
      <DocExplorer />
    </div>
  );
}

export default App;
