import React, { useState, useEffect } from 'react';
import { Form, Card, Col, Row, message } from 'antd';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormButton from '../components/Button';
import CustomDatePicker from '../components/DatePicker';
import { useQuery, isLoggedIn } from '../util/helpers'
import moment from 'moment'
import '../scss/createproject.scss';



const CreateProject = (props) => {
    const [form] = Form.useForm();
    const [project, setProject] = useState({});
    const query = useQuery();
    const id = query.get('id');

    useEffect(() => {
        const user = isLoggedIn();
        if(!user) {
            props.history.push('/login')
        }
        if(id) {
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
                }
            });
        }
    }, [])

    const onFinish = async (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'startDate': fieldsValue['startDate'].format('YYYY-MM-DD'),
            'endDate': fieldsValue['endDate'].format('YYYY-MM-DD'),
        };
        if (id) {
            await axios.put(`https://taskmanagement1.herokuapp.com/api/v1/project/${id}`, { technology: values.technology, projectName: values.projectName, startDate: values.startDate, endDate: values.endDate })
                .then(res => {
                    if (res.data.success) {
                        message.success("Project updated successfully")
                        props.history.push('project')
                    }
                });
        }
        if (!id) {
            await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/project`, { technology: values.technology, projectName: values.projectName, startDate: values.startDate, endDate: values.endDate })
                .then(res => {
                    if (res.data.success) {
                        message.success("Project created successfully")
                        props.history.push('project')
                    }
                });
        }
    };

    const onFinishFailed = (errorInfo) => {
    };


    return (

        <div className="site-card-border-less-wrapper create-project-card">
            <Card title="Create Project" bordered={false}>
                <Form form={form} name="basic" labelCol={{ span: 24 }} initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormInput label="ProjectName" name="projectName" value={project.projectName} message="Please input your projectname!" />

                        </Col>
                        <Col span={12}>
                            <FormInput label="Technology" name="technology" value={project.technology} message="Please input your technology!" />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <CustomDatePicker label="StartDate" name="startDate" message="Please select start date" />

                        </Col>
                        <Col span={12}>
                            <CustomDatePicker label="EndDate" name="endDate" message="Please select end date" />
                        </Col>
                    </Row>
                    <FormButton classes="signup-btn" span="24">Submit</FormButton>
                </Form>
            </Card>
        </div>

    );
};

export default CreateProject;





