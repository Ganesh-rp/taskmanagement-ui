import React from 'react';
import { Form, Card } from 'antd';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormInputPassword from '../components/FormInputPassword';
import FormButton from '../components/Button';
import { setItem } from '../util/helpers';
import '../scss/login.scss';



const Login = (props) => {
    const onFinish = async (values) => {
        console.log('Success:', values);
        await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/user/login`, { email: values.email, password: values.password })
            .then(res => {
                if (res) {
                    setItem('user', res.data.data);
                    props.history.push('/project');
                }
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        // <div>
            <div className="site-card-border-less-wrapper login-card">
                <Card title="Login" bordered={false}>
                    <Form name="basic" labelCol={{  span: 24}}  initialValues={{ remember: true, }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <FormInput label="Email" name="email" message="Please input your username!" />
                        <FormInputPassword label="Password" name="password" message="Please input your password!" />
                        <FormButton classes="login-btn" span="24">Submit</FormButton>
                    </Form>
                </Card>
            </div>

        // </div>

    );
};

export default Login;





