import React, { useEffect } from 'react';
import { Router, Route, Switch, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import CreateProject from './pages/createproject';
import Login from './pages/login';
import Project from './pages/projects';
import SignUp from './pages/signup';
import CommonHeader from './components/Header';


const { Content } = Layout;


const Routes = () => {
    const history = useHistory();

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Layout>
                    <CommonHeader history={history} />
                    <Content>
                        <Route path="/project" component={ Project} />
                        <Route path="/createproject" component={CreateProject} />
                    </Content>
                </Layout>
            </Switch>
        </Router>
    )
}

export default Routes;

