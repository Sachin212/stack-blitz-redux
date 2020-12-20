import React from 'react';
import axios from 'axios';
import * as Host_IP from '../Host';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';


const CustomForm = (props) => {

    const [form] = Form.useForm();

    const handleFormSubmit = async (e, requestType, articleID) => {

        // const title = e.target.elements.title.value;
        // const content = e.target.elements.content.value;

        const title = e.title;
        const content = e.content;

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: props.token
        }
        
        switch ( requestType ){
            case 'post':
                try {
                    const res = await axios.post(`${Host_IP}/api/`, {
                        title: title,
                        content: content
                    });
                    return console.log(res);
                } catch (err) {
                    return console.group(err);
                }
            case 'put':
                try {
                    const res_1 = await axios.put(`${Host_IP}/api/${articleID}/`, {
                        title: title,
                        content: content
                    });
                    return console.log(res_1);
                } catch (err_1) {
                    return console.group(err_1);
                }
        }
    };

    return (
        <>
            <Form
                form={form}
                onFinish={(e) => handleFormSubmit(
                    e,
                    props.requestType,
                    props.articleID
                )}
            >
                <Form.Item name="title">
                    <Input placeholder="Title" />
                </Form.Item>

                <Form.Item name="content">
                    <Input placeholder="Content" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </>
    )
};

const mapStateToProps = state => {
    return {
      token: state.token
    }
}

export default connect(mapStateToProps)(CustomForm);