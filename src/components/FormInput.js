import React, { useEffect } from 'react';
import { Form, Input } from 'antd';


const FormInput = ({ label, name,  message }) => {

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required: true,
                    message: message,
                },
            ]}
        >
            <Input />
        </Form.Item>
    )
}

export default FormInput;