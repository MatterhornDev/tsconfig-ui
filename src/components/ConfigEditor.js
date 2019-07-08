import React from 'react'
import parse from 'json-to-ast'
import { reduce } from 'conditional-reduce'
import ReactHtmlParser from 'react-html-parser'

const o = {
  foo: 'bar',
  abc: {
    k: 'v',
    a: 'z',
    fuzz: true
  }, 
  xyz: [1, 'a'] 
}
const s = JSON.stringify(o, 0, 2)
const ast = parse(s)

console.log(ast)

const Identifier = ({ handleKeySelect, value, raw }) => {
  return (
    <span
      className='identifier'
      onClick={() => handleKeySelect(value)}
    >
      {raw}
    </span>
  )
}

// Construct String by joining all in strArr
function conStr(strArr) {
  return strArr.join('')
}

// Recursive build method transforms JSON AST into HTML String
function build(obj, args = {}) {
  // Everything in JS is an object; thus check if obj is an array before checking if it is an object
  if (Array.isArray(obj)) {
    return obj.reduce(
      (accumulator, child, index) =>
        accumulator + (
          reduce(
            child.type,
            {
              Property: () => build(child, { 
                index,
                isRoot: false,
                lastProp: index === obj.length - 1 
              }),
              Literal: () => build(child, {
                index,
                isLiteralInArray: true,
                isLastLiteralInArray: index === obj.length - 1
              }),
            },
            () => build(child, { index })
          )
        ),
      ''
    )
  } else if (typeof obj === 'object') { // make sure obj is not a primitive type
    // match the obj type
    switch (obj.type) {
      case 'Object':
        return conStr([
          '{',
          build(obj.children, args),
          '\n',
          (args.isRoot ? '' : ' '.repeat(obj.loc.end.column - 1)),
          '}'
        ])
      case 'Property':
        return conStr([
          '\n',
          (' '.repeat(obj.loc.start.column)),
          build(obj.key, args),
          ': ',
          build(obj.value, args),
          (args.lastProp ? '' : ',')
        ])
      case 'Identifier':
        return `<span name='identifier' data-value='${obj.value}' data-raw='${obj.raw}'>${obj.raw}</span>`
      case 'Literal':
        return conStr([
          obj.raw,
          (args.isLiteralInArray && !args.isLastLiteralInArray ? ', ' : '')
        ])
      case 'Array':
        return conStr([
          '[',
          build(obj.children, args),
          ']'
        ])
      default:
        return ``
    }
  }
}

const ConfigEditor = ({ handleKeySelect }) => (
  <div className="configEditor-container">
    <pre>
      <code>
        {ReactHtmlParser(
          build(ast, { isRoot: true }),
          {
            transform: ({ name, attribs }, index) => {
              if (name === 'span') {
                return (
                  <Identifier
                    key={`Identifier-${index}`}
                    value={attribs['data-value']}
                    raw={attribs['data-raw']}
                    handleKeySelect={handleKeySelect}
                  />
                )
              }
            }
          }
        )}
      </code>
    </pre>
  </div>
)

export default ConfigEditor
