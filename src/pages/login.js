import React, { useEffect } from 'react';
import { Form, Card, message } from 'antd';
import axios from 'axios';
import FormInput from '../components/FormInput';
import FormInputPassword from '../components/FormInputPassword';
import FormButton from '../components/Button';
import { setItem, isLoggedIn } from '../util/helpers';
import '../scss/login.scss';




const Login = (props) => {

    useEffect(() => {
      const user = isLoggedIn();
      if(user) {
          props.history.push('/project')
      }
    }, [])

    const onFinish = async (values) => {
        console.log('Success:', values);
        await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/user/login`, { email: values.email, password: values.password })
            .then(res => {
                if (res.data.data) {
                    message.success('User logged in successfully');
                    setItem('user', res.data.data);
                    props.history.push('/project');
                }
                if (res.data.errorMessage) {
                    message.error(res.data.errorMessage);
                }
            }).catch(err => {
                message.error('Login Failed');
            });
    };

    const onFinishFailed = (errorInfo) => {
    };

    return (
        <div className="site-card-border-less-wrapper login-bg login-card">
            <Card title="Login" bordered={false}>
                <Form name="basic" labelCol={{ span: 24 }} initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormInput label="Email" name="email" type="email" typeMessage="The input is not valid E-mail!" message="Please input your E-mail!" />
                    <FormInputPassword label="Password" name="password" message="Please input your password!" />
                    <div className="text-center">Don't have an account?<a href="/signup"> Sign up</a></div>
                    <FormButton classes="login-btn" span="24">Submit</FormButton>
                </Form>
            </Card>
        </div>
    );
};

export default Login;





