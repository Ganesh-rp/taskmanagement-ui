import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormButton from '../components/Button';
import CustomDatePicker from '../components/DatePicker';
import { useQuery } from '../util/helpers'
import moment from 'moment'



const CreateProject = (props) => {
    console.log('-----------props========', props)
    const [form] = Form.useForm();
    const [project, setProject] = useState({});
   const query = useQuery();
   const id = query.get('id');
   console.log('--------------id---------', id)
    useEffect(() => {

         axios.get(`https://taskmanagement1.herokuapp.com/api/v1/project/${id}`)
        .then(res => {
          if (res) {
              setProject(res.data.data)
              form.setFieldsValue({
                  projectName: res.data.data.projectName,
                  technology: res.data.data.technology,
                  startDate: moment(res.data.data.startDate),
                  endDate: moment(res.data.data.endDate)
              })
            console.log('----------re-s- id-------', res)
          }
        });
    }, [])

    const onFinish = async (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'startDate': fieldsValue['startDate'].format('YYYY-MM-DD'),
            'endDate': fieldsValue['endDate'].format('YYYY-MM-DD'),
          };
    if(id) {
        await axios.put(`https://taskmanagement1.herokuapp.com/api/v1/project/${id}`, { technology: values.technology, projectName: values.projectName, startDate: values.startDate, endDate:values.endDate })
        .then(res => {
            if(res.data.success) {
                props.history.push('project')
            }
        });
    }
    if(!id) {
        await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/project`, { technology: values.technology, projectName: values.projectName, startDate: values.startDate, endDate:values.endDate })
        .then(res => {
            if(res.data.success) {
                props.history.push('project')
            }
        });
    }



    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangeDate = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }


    return (
        <div>

            <Form form={form} name="basic" labelCol={{ span: 6, }} wrapperCol={{ span: 6, }} initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormInput label="ProjectName" name="projectName" value={project.projectName} message="Please input your projectname!" />
                <FormInput label="Technology" name="technology"  value={project.technology} message="Please input your technology!" />
                <CustomDatePicker label="StartDate" name="startDate" message="Please select start date" />
                <CustomDatePicker label="EndDate" name="endDate" message="Please select end date" />
                <FormButton offset="8" span="16">Submit</FormButton>
            </Form>
        </div>

    );
};

export default CreateProject;





