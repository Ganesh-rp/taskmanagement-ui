import React from 'react';
import { Select } from 'antd';
const { Option } = Select;



const SelectOption = ({options}) => {


    return (
        options.map((option, i) => {
            return (
               <Option key={i} value={option.value}>{option.name}</Option>
            )
        })
      
    )
}

export default SelectOption;