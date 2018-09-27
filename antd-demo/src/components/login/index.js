import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'dva';
import './index.css'

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    handleSubmit(e) {
        const { form, dispatch } = this.props
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                let data = {
                    username: values.username,
                    password: values.password
                };
                dispatch({
                    type: "login/login",
                    payload: data
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账号！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" autoComplete="off" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码! ' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    {/* <a className="login-form-forgot" href="">忘记密码</a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登 录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const LoginForm = connect()(Form.create({})(NormalLoginForm));

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login">
                {/* <CommonHeader isLogin={false}/> */}
                <div className="login-contain">
                    <div className="login-block">
                        <LoginForm />
                    </div>
                </div>
            </div>

        );
    }
}
export default Login
