import React from 'react';
import { Form, Card, message, Col, Row } from 'antd';
import FormInput from '../components/FormInput';
import FormInputPassword from '../components/FormInputPassword';
import FormInputConfirmPassword from '../components/FormInputConfirmPassword';
import FormSelect from '../components/FormSelect';
import FormButton from '../components/Button';
import axios from 'axios';
import '../scss/signup.scss';



const SignUp = (props) => {

    const position = [{ value: "Admin", name: "admin" }, { value: "Manager", name: "manager" }]

    const onFinish = async (values) => {
        console.log('Success:', values);
        await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/user`, {
            userName: values.username
            , password: values.password, position: values.position, email: values.email
        })
            .then(res => {
                if (res.data.data) {
                    message.success("User successfully registered");
                    props.history.push('/login')
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
    };


    return (
        <div className="site-card-border-less-wrapper signup-card">
            <Card title="SignUp" bordered={false}>
                <Form name="basic" labelCol={{ span: 24 }} initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormInput label="Username" name="username" message="Please input your username!" />
                        </Col>
                        <Col span={12}>
                            <FormInput label="Email" name="email" type="email" typeMessage="The input is not valid E-mail!" message="Please input your email!" />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormInputPassword label="Password" name="password" message="Please input your password!" />
                        </Col>
                        <Col span={12}>
                            <FormInputConfirmPassword label="Confirm Password" name="confirm" message="Please confirm your password!" />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormSelect label="Position" name="position" options={position} />
                        </Col>
                    </Row>
                    <div className="text-center">Already have an account?<a href="/login"> Login</a></div>
                    <FormButton classes="signup-btn" span="24">Submit</FormButton>
                </Form>
            </Card>
        </div>
    );
};

export default SignUp;





