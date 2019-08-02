import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const ConfigOption = ({ handleOptionSelect, value }) => {
  return (
    <span
      className='identifier'
      onClick={() => handleOptionSelect(value)}
    >
      "{value}"
    </span>
  )
}

function genCodeString2 (data = {}) {
  let str = '{\n'
  for (let k in data) {
    str += '  "' + k + '": {'

    if (Object.keys(data[k]) === []) {
      str += ' },\n'
      continue
    }

    for (let l in data[k]) {
      str +=
        '\n    ' +
        `<span data-value="${l}"></span>` +
        ': ' +
        data[k][l] +
        ','
    }

    str += '\n  },\n'
  }
  str += '}'
  return str
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
  async componentDidMount() {
    const res = await fetch('http://localhost:3000/tsconfig/defaults')
    const json = await res.json()
    const configuration = {
      compilerOptions: {}
    }

    json.forEach(v => configuration.compilerOptions[v.option] = v.defaultValue)

    this.props.handleSetConfiguration(configuration)
  }

  render() {
    return (
      <div className="configEditor-container">
        {!this.props.configuration ? (
          <p>Loading . . .</p>
        ) : (
          <pre>
            <code>
              {
                ReactHtmlParser(
                  genCodeString2(this.props.configuration),
                  {
                    transform: ({ name, attribs }, index) => {
                      if (name === 'span') {
                        return (
                          <ConfigOption
                            key={`option-${index}`}
                            value={attribs['data-value']}
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
