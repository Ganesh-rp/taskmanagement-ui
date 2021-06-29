import React from 'react';
import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { clearItem } from '../util/helpers';
import '../scss/header.scss'

const { Header } = Layout;


const CommonHeader = (props) => {
    const logOut = () => {
        clearItem();
        props.history.push('/login')
    }
    return (
        <Header>
            <div className="row header">
                <div className="logout">Logout</div>
                <div onClick={logOut} className="logout_icon"><LogoutOutlined /></div>
            </div>
        </Header>
    )
}

export default CommonHeader;