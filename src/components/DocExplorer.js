import React from 'react'
import SelectSearch from 'react-select-search'

class DocExplorer extends React.Component {
  state = {
    isLoadingDocs: undefined,
    data: undefined,
    searchText: '',
    options: [],
    searchList: []
  }

  async componentDidMount() {
    const res = await fetch(`http://localhost:3000/tsconfig/options`)
    const options = await res.json()
    this.setState({
      options
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedOption !== prevProps.selectedOption) {
      this.setState({
        isLoadingDocs: true
      }, async () => {
        const res = await fetch(`http://localhost:3000/tsconfig?option=${this.props.selectedOption}`)
        const data = await res.json()
        console.log(data)
        this.setState({
          isLoadingDocs: false,
          data
        })
      })
    }
  }

  render() {
    return (
      <div className='docExplorer-container'>
        <SelectSearch
          className='search-list'
          options={this.state.options.map(k => ({ name: k, value: k }))}
          placeholder='tsconfig compiler option'
          value={this.props.selectedOption}
          onChange={({ value }) => this.props.handleOptionSelect(value)}
        />
        <h1>{this.props.selectedOption || 'Select a compiler option'}</h1>
        {
          this.state.isLoadingDocs !== undefined && (
            !this.state.isLoadingDocs && this.state.data !== undefined ? (
              <React.Fragment>
                
                <div className='option-controller-container'>
                  <button 
                    className='option-controller-button add-button'
                    onClick={() => this.props.addOption({
                      value: this.props.selectedOption
                    })}
                  >Add</button>
                  <button 
                    className='option-controller-button remove-button'
                    onClick={() => this.props.removeOption({
                      value: this.props.selectedOption
                    })}
                  >Remove</button>
                  <button className='option-controller-button edit-button'>Edit</button>
                </div>
              </React.Fragment>
            ) : (
              <p>Loading . . .</p>
            )
          )
        }
        
      </div>
    )
  }
}

export default DocExplorer