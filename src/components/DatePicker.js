import React from 'react';
import { DatePicker, Form } from 'antd';
import moment from 'moment';







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
    // const dateFormatList = ['DD-MM-YYYY'];

    return (
        <>

            <Form.Item name={name} label={label} {...config}>
                <DatePicker/>
            </Form.Item>
            {/* <Space direction="vertical" size={12}>
                <label>{label}</label>
                <DatePicker onChange={onChangeDate} defaultValue={moment(moment(), dateFormatList[0])} format={dateFormatList} />
            </Space> */}
        </>

    );
};

export default CustomDatePicker;





