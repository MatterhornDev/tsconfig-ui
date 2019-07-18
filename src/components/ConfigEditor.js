import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const ConfigOption = ({ handleKeySelect, value }) => {
  return (
    <span
      className='identifier'
      onClick={() => handleKeySelect(value)}
    >
      "{value}"
    </span>
  )
}

function genCodeString ( data ) {
  let str = '{'
  data && data.forEach(v => {
    str += (
      '\n' +
      `  <span data-value="${v.option}">"${v.option}"</span>` +
      ': ' +
      `${v.defaultValue},`
    )
  })
  str += '\n}'
  return str
}

class ConfigEditor extends React.Component {
  state = {
    isLoadingMainEditor: false,
    json: undefined
  }
  componentDidMount() {
    this.setState({
      isLoadingMainEditor: true
    }, async () => {
      const res = await fetch('http://localhost:3000/tsconfig/defaults')
      const json = await res.json()
      this.setState({
        isLoadingMainEditor: false,
        json
      })
    })
  }
  render() {
    return (
      <div className="configEditor-container">
        {this.state.isLoadingMainEditor ? (
          <p>Loading . . .</p>
        ) : (
          <pre>
            <code>
              {
                ReactHtmlParser(
                  genCodeString(this.state.json),
                  {
                    transform: ({ name, attribs }, index) => {
                      if (name === 'span') {
                        return (
                          <ConfigOption
                            key={`option-${index}`}
                            value={attribs['data-value']}
                            handleKeySelect={this.props.handleKeySelect}
                          />
                        )
                      }
                    }
                  }
                )
              }
            </code>
          </pre>
        )}
      </div>
    )
  }
}

export default ConfigEditor
