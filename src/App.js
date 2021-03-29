import React from 'react';
import 'antd/dist/antd.css';

const App = () => {
  const inputValue = 'Com1>Com2&Com3&Com4>Com5&Com6>Com7>Com8&Com9'
  const result = []

  function parse(inputValue) {

    const stringSeparatedOnPiece = inputValue.split('>')

    function rec(array, parent = null) {
      // debugger
      if (array.length) {
        const part = array.shift()
        const siblings = part.split('&')
        if (siblings.length > 1) {
          let oneOfTheSiblingsComponents = {}
          for (const compon of siblings) {
            oneOfTheSiblingsComponents = {name: compon}
            if (parent) {
              if (!parent.hasOwnProperty('children'))
                parent.children = []
              parent.children.push(oneOfTheSiblingsComponents)
            } else {
              result.push(oneOfTheSiblingsComponents)
            }
          }
          rec(array, oneOfTheSiblingsComponents)
        } else {
          const componentWithoutSiblings = {name: siblings[0]}
          if (parent) {
            if (!parent.hasOwnProperty('children'))
              parent.children = []
            parent.children.push(componentWithoutSiblings)
          } else {
            result.push(componentWithoutSiblings)
          }
          rec(array, componentWithoutSiblings)
        }
      }
    }

    rec(stringSeparatedOnPiece)
  }

  parse(inputValue)
  console.log(result)

  return (
      <>
        <div>{JSON.stringify(result)}</div>
      </>
  )
}

App.defaultProps = {
  incomArr: ['Component1', 'Component2', 'Component3', 'Component4', 'Component5', 'Component6', 'Component7', 'Component8', 'Component9', 'Component10']
}
export default App