import React from 'react';
import './utils/typography'
import Sidebar from './components/Sidebar/Sidebar'
import ConfigEditor from './components/ConfigEditor'
import DocExplorer from './components/DocExplorer'

class App extends React.Component {
  state = {
    selectedKey: undefined
  }

  onKeySelect = (value) => {
    console.log(value)
    this.setState({
      selectedKey: value
    })
  }
  render () {
    return (
      <div className='app-container'>
        <Sidebar />
        <ConfigEditor handleKeySelect={this.onKeySelect} />
        <DocExplorer selectedKey={this.state.selectedKey} />
      </div>
    );
  }
}


export default App;
