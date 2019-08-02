import React from 'react';
import './utils/typography'
import Sidebar from './components/Sidebar/Sidebar'
import ConfigEditor from './components/ConfigEditor'
import DocExplorer from './components/DocExplorer'

class App extends React.Component {


  state = {
    selectedOption: undefined,
    configuration: undefined
  }

  setConfiguration = configuration => this.setState({ configuration })

  onSelectOption = (value) => {
    this.setState({
      selectedOption: value
    })
  }

  addOption = async ({ value }) => {
    const { configuration } = this.state

    if (!configuration.hasOwnProperty('compilerOptions')) {
      configuration['compilerOptions'] = {}
    }

    if (!configuration.compilerOptions.hasOwnProperty(value)) {
      const res = await fetch(`http://localhost:3000/tsconfig?option=${value}`)
      const data = await res.json()
      configuration.compilerOptions[value] = data.defaultValue
      this.setState({ configuration })
    }
  }

  removeOption = ({ value }) => {
    const { configuration } = this.state

    if (!configuration.hasOwnProperty('compilerOptions')) return

    if (configuration.compilerOptions.hasOwnProperty(value)) {
      delete configuration.compilerOptions[value]
      this.setState({ configuration })
    }
  }

  render () {
    return (
      <div className='app-container'>
        <Sidebar />
        <ConfigEditor
          configuration={this.state.configuration}
          handleSetConfiguration={this.setConfiguration}
          handleOptionSelect={this.onSelectOption}
        />
        <DocExplorer
          handleAddOption={this.addOption}
          handleRemoveOption={this.removeOption}
          handleEditOption={this.editOption}
          selectedOption={this.state.selectedOption} 
          handleOptionSelect={this.onSelectOption}
        />
      </div>
    );
  }
}


export default App;
