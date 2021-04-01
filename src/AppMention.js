import React from 'react';
import 'antd/dist/antd.css';
import {Button, Select, Mentions, Typography} from 'antd';
import {useState} from "react";

const AppMention = (props) => {
    const {Option} = Mentions;
    const {incomArr} = props
    const [selectedItems, setSelectedItem] = useState([])

    const onChange = (selected) => {
        setSelectedItem(selected);
    }

    const filteredOptions = incomArr.filter(i => !selectedItems.includes(i));

    const str1 = (selectedItems.toString()/*.replaceAll('>','",name:"').replaceAll('&','",children":[')*/);
    return (
        <>
            <Typography>List of components</Typography>
            <Mentions style={{width: '100%'}} split='' onChange={onChange}
                      prefix={[' ','>','&']}>
                {filteredOptions.map((item, index) => (
                    <Option key={index} value={item}>
                        {item}
                    </Option>
                ))}
            </Mentions>
            <Button onClick={() => console.log(str1)}>
                Log string
            </Button>
        </>
    )
}

AppMention.defaultProps = {
    incomArr: ['Component1', 'Component2', 'Component3', 'Component4', 'Component5', 'Component6', 'Component7', 'Component8', 'Component9', 'Component10'],
}
export default AppMention