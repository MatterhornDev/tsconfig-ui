import React from 'react'
import SelectSearch from 'react-select-search'

// const DocExplorer = ({ selectedKey }) => {
//   return (
//     <div className='docExplorer-container'>
//       <h1>{selectedKey || 'Select a key'}</h1>
//       <p>I don't do anything just yet, but in the future I'll make GET requests to tsconfig-api to get documentation details on the TypeScript configuration property you just selected - <span role='img' aria-label='ghost emoji'>👻</span></p>
//     </div>
//   )
// }

const SearchList = ({ data = [] }) => {
  return (
    <ul className='search-list-container'>
      {
        data.map((s, i) => <li key={i} className='search-list-item'>{s}</li>)
      }
    </ul>
  )
}

const callSelectSearch = (data = []) => {
  const options = data.map(k => ({
    name: k,
    value: k
  }))
  return (
    <SelectSearch 
      options={options}
      className='search-list'
    />
  )
}

class DocExplorer extends React.Component {
  state = {
    isLoadingDocs: undefined,
    data: undefined,
    searchText: '',
    keys: undefined,
    searchList: []
  }
  async componentDidMount() {
    const res = await fetch(`http://localhost:3000/tsconfig/keys`)
    const keys = await res.json()
    this.setState({
      keys
    })
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedKey !== prevProps.selectedKey) {
      this.setState({
        isLoadingDocs: true
      }, async () => {
        const res = await fetch(`http://localhost:3000/tsconfig?option=${this.props.selectedKey}`)
        const data = await res.json()
        console.log(data)
        this.setState({
          isLoadingDocs: false,
          data
        })
      })
    }
  }
  handleInput = ({ target: { value }}) => {
    console.log(value)
    this.setState({
      searchText: value,
      searchList: this.state.keys.filter(key => value && key.indexOf(value) > -1)
    })
  }
  render() {
    return (
      <div className='docExplorer-container'>
        {/*<div className='search-container'>*/}
          { /* <input type="text" className="search-input" placeholder="Search..." value={this.state.searchText} onChange={this.handleInput} />
           <SearchList data={this.state.searchList} /> */ }
          { callSelectSearch(this.state.keys) }
        {/*</div>*/}
        <h1>{this.props.selectedKey || 'Select a key'}</h1>
        {
          this.state.isLoadingDocs !== undefined && (
            !this.state.isLoadingDocs && this.state.data !== undefined ? (
              <p>{this.state.data.description}</p>
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