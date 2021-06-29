import React from 'react';
import { Form, Select } from 'antd';
import SelectOption from './SelectOption';


const FormSelect = ({label, name, message, options, ...props}) => {
    const typeChange = (e) => {
     props.typeChange(e)
    }
    return (
        <Form.Item name={name} label={label} rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={typeChange}
          allowClear
        >
         <SelectOption options={options} />
        </Select>
      </Form.Item>
    )
}

export default FormSelect;