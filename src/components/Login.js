import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { Spin } from 'antd';
import * as actions from '../store/actions/auth';
import { LoadingOutlined } from '@ant-design/icons';



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Login = (props) => {
  const handleSubmit = (values) => {
    props.onAuth(values.username, values.password);
    props.history.push('/');
    // console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  let errorMessage = null;
  if (props.error) {
      errorMessage = (
          <p>{props.error.message}</p>
      )
  }

  return (
    <div>

        {errorMessage}

        {
            props.loading ?

            <Spin indicator={antIcon} />

            :

            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input placeholder="UserName" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Login
                    </Button>
                    or
                    <NavLink 
                    style={{marginRight: '10px'}} 
                    to='/signup/'> Signup
                    </NavLink>
                </Form.Item>
            </Form>
        }
    </div>
  );
};

const mapStateToProps = (state) => {
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


