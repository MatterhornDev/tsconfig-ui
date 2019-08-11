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

  editOption = ({ option, value }) => {
    this.setState(({ configuration }) => {
      configuration.compilerOptions[option] = value
      return {
        configuration
      }
    })
  }

  resetConfig = () => {
    window.localStorage.removeItem('configuration')
    window.location.reload(true)
  }

  saveConfig = () => {
    window.localStorage.setItem('configuration', JSON.stringify(this.state.configuration))
  }

  downloadConfig = () => {
    const { configuration } = this.state
    this.saveConfig()
    const res = {}
    for (let k1 in configuration) {
      res[k1] = configuration[k1]
      for (let k2 in configuration[k1]) {
        let v = configuration[k1][k2]
        if ( v === 'true' ) {
          res[k1][k2] = true
        } else if ( v === 'false' ) {
          res[k1][k2] = false
        } else {
          res[k1][k2] = v.replace(/"(.*)"/, '$1').replace(/\\"(\w*)\\"/, '$1') 
        }
      }
    }
    let e = document.createElement('a')
    e.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(res, 0, 2)))
    e.setAttribute('download', 'tsconfig.json')
    e.style.display='none'
    document.body.appendChild(e)
    e.click()
    document.body.removeChild(e)
    window.location.reload(true)
  }

  render () {
    return (
      <div className='app-container'>
        <Sidebar 
          handleDownload={this.downloadConfig}
          handleReset={this.resetConfig}
          handleSave={this.saveConfig}
        />
        <ConfigEditor
          configuration={this.state.configuration}
          handleSetConfiguration={this.setConfiguration}
          handleOptionSelect={this.onSelectOption}
        />
        <DocExplorer
          configuration={this.state.configuration}
          handleAddOption={this.addOption}
          handleRemoveOption={this.removeOption}
          selectedOption={this.state.selectedOption} 
          handleOptionSelect={this.onSelectOption}
          handleEditOption={this.editOption}
        />
      </div>
    );
  }
}


export default App;
