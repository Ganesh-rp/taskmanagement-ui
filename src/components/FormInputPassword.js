import React from 'react';
import { Form, Input  } from 'antd';


const FormInputPassword = ({label, name, message}) => {
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
            <Input.Password />
        </Form.Item>
    )
}

export default FormInputPassword;