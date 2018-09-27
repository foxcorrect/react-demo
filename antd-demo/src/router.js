import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import SiderLayout from './components/layout/index';
import Login from './components/login/index';
import FileUp from './pages/file/index'

function RouterConfig({ history }) {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Redirect exact from="/" to="/login"></Redirect>
                    <Route path="/index" render={(props) => (
                        <SiderLayout>
                            <Route path="/index/home" render={(props) => (
                                <Route path="/index/home/file" component={FileUp} />
                            )}>
                            </Route>
                        </SiderLayout>
                    )}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig;