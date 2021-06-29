import React from 'react';
import { Form } from 'antd';
import FormInput from '../components/FormInput';
import FormInputPassword from '../components/FormInputPassword';
import FormSelect from '../components/FormSelect';
import FormButton from '../components/Button';
import axios from 'axios';






const SignUp = (props) => {
    const onFinish = async (values) => {
        console.log('Success:', values);
        await axios.post(`https://taskmanagement1.herokuapp.com/api/v1/user`, { userName: values.username
    , password: values.password, position: values.position, email: values.email })
        .then(res => {
            if(res) {
                props.history.push('/login')

            }
        });
    };

const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
const userTypeChange = (e) => {
}

const hello = [{value: "Admin", name: "admin"}, {value: "Manager", name: "manager"}]

    return (
        <div>

            <Form name="basic" labelCol={{  span: 8, offset: 8 }} wrapperCol={{ span: 8, offset: 8 }} initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormInput label="Username" name="username" message="Please input your username!" />
                <FormSelect label="Position" name="position" options={hello} typeChange={userTypeChange} />
                <FormInput label="Email" name="email" message="Please input your email!" />
                <FormInputPassword label="Password" name="password" message="Please input your password!" />
                <FormButton offset="8" span="16">Submit</FormButton>
            </Form>
        </div>

    );
};

export default SignUp;





