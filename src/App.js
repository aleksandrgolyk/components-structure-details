import React from 'react';
import 'antd/dist/antd.css';
import {Button, Card, Mentions, Typography} from "antd";
import {useState} from "react";
import Title from "antd/lib/typography/Title";

const App = (props) => {
    const {Option} = Mentions;
    const {incomArr} = props
    const [selectedItems, setSelectedItem] = useState([])

    const onChange = (selected) => {
        setSelectedItem(selected);
    }

    const filteredOptions = incomArr.filter(i => !selectedItems.includes(i));

    const str1 = (selectedItems.toString())


    // const inputValue = 'Com1>Com2&Com3&Com4>Com5&Com6>Com7>Com8&Com9'
    const inputValue = str1
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

    const resultToJson = JSON.stringify(result)
    return (
        <>
            <Typography>List of components</Typography>
            <Mentions style={{width: '100%'}} split='' onChange={onChange}
                      prefix={[' ', '>', '&']}>
                {filteredOptions.map((item, index) => (
                    <Option key={index} value={item}>
                        {item}
                    </Option>
                ))}
            </Mentions>
            {/*<Button onClick={() => console.log(str1)}>*/}
            {/*    Log string*/}
            {/*</Button>*/}
            <Card bordered hoverable>
                <Title level={4}>Result as JSON</Title>
            <div>{resultToJson}</div>
            </Card>
        </>
    )
}

App.defaultProps = {
    incomArr: ['Component1', 'Component2', 'Component3', 'Component4', 'Component5', 'Component6', 'Component7', 'Component8', 'Component9', 'Component10']
}
export default App