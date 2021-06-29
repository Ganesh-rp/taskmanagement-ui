import React from 'react';
import { Router, Route, Switch, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import CreateProject from './pages/createproject';
import Login from './pages/login';
import NotFound from './pages/notfound';
import Project from './pages/projects';
import SignUp from './pages/signup';
import CommonHeader from './components/Header';


const { Header, Footer, Content } = Layout;


const Routes = () => {
    return (
        <Router history={useHistory()}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route  path="/login" component={Login} />
                <Route  path="/signup" component={SignUp} />
                <Layout>
                    <CommonHeader history={useHistory()} />
                    <Content>
                        <Route  path="/project" component={Project} />
                        <Route  path="/createproject" component={CreateProject} />
                    </Content>
                </Layout>
                <Route  path="*" component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Routes;

