import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import deepEqual from 'deep-equal'

const ConfigOption = ({ handleOptionSelect, value, defaultValue }) => {
  return (
    <span
      className='identifier'
      onClick={() => handleOptionSelect(value)}
    >
      "{value}"
    </span>
  )
}

function genCodeString ( data ) {
  let str = '{\n  "compilerOptions": {'
  data && data.forEach((v, i) => {
    str += 
      '\n    ' + 
      `<span data-value="${v.option}"></span>` + 
      ': ' + 
      v.defaultValue + 
      (i === data.length - 1 ? '' : ',')
  })
  str += '\n  }\n}'
  return str
}

class ConfigEditor extends React.Component {
  state = {
    isLoadingMainEditor: false,
    json: undefined
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.controlledOptions, prevProps.controlledOptions)
    if (!deepEqual(prevProps.controlledOptions, this.props.controlledOptions)) {
      console.log('🎉')
    }
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
                            defaultValue={attribs['data-defaultValue']}
                            handleOptionSelect={this.props.handleOptionSelect}
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
