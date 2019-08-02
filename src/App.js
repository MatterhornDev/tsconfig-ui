import React from 'react';
import './utils/typography'
import Sidebar from './components/Sidebar/Sidebar'
import ConfigEditor from './components/ConfigEditor'
import DocExplorer from './components/DocExplorer'

class App extends React.Component {
  state = {
    selectedOption: undefined,
    controlledOptions: {}
  }

  onSelectOption = (value) => {
    console.log(value)
    this.setState({
      selectedOption: value
    })
  }

  addOption = async ({value, defaultValue}) => {
    if (!this.state.controlledOptions.hasOwnProperty(value)) {
      const res = await fetch(`http://localhost:3000/tsconfig?option=${value}`)
      const data = await res.json()
      this.setState(({ controlledOptions }) => {
        controlledOptions[value] = data.defaultValue
        return { controlledOptions }
      })
    }
  }

  removeOption = ({ value }) => {
    if (this.state.controlledOptions.hasOwnProperty(value)) {
      this.setState(({ controlledOptions }) => {
        delete controlledOptions[value]
        return { controlledOptions }
      })
    }
  }

  render () {
    return (
      <div className='app-container'>
        <Sidebar />
        <ConfigEditor
          controlledOptions={this.state.controlledOptions}
          handleOptionSelect={this.onSelectOption} 
        />
        <DocExplorer 
        addOption={this.addOption}
        removeOption={this.removeOption}
        selectedOption={this.state.selectedOption} 
        handleOptionSelect={this.onSelectOption} />
      </div>
    );
  }
}


export default App;
