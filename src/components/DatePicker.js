import React from 'react';
import { DatePicker, Form } from 'antd';


const CustomDatePicker = ({ label, name, message }) => {
 
    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: message,
          },
        ],
      };

    return (
        <>

            <Form.Item name={name} label={label} {...config}>
                <DatePicker />
            </Form.Item>
        </>

    );
};

export default CustomDatePicker;





