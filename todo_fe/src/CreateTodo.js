import React from 'react';
import moment from 'moment';
import { Drawer, Form, Button, Input, DatePicker } from 'antd';

import http from './server';

function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().endOf('day') - 1;
}
  
class CreateTodoDrawerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    async createTodo(todo) {
        const res = await http.post('/create', {
            name: todo.name,
            deadline: todo.dateTime.format("YYYY-MM-DD"),
            content: todo.content,
        })

        if (res) {
            //console.log(this.props);
            this.props.createTodoHandle(true);
        }
    }

    handleSubmit (e) {
        e.preventDefault();
        // console.log("handle submit");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log("Receive values of form", values);
                this.createTodo(values);
            }
        });

        this.props.form.resetFields();// 清除表单数据

        this.setState({
            visible: false,
        });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });

        this.props.createTodoHandle(false);
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onReset = () => {
        // console.log("Reset button clicked");
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button onClick={this.showDrawer}>新增</Button>

                <Drawer
                    title="新增任务"
                    width={360}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                <Form layout="vertical" hideRequiredMark onSubmit={e => this.handleSubmit(e)}>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please enter name' }],
                        })(<Input
                        placeholder= "Please enter name"
                        />)}
                    </Form.Item>
                    <Form.Item label="DateTime">
                        {getFieldDecorator('dateTime', {
                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                        })(
                        <DatePicker
                            style={{ width: '100%' }}
                            getPopupContainer={trigger => trigger.parentNode}
                            disabledDate={disabledDate}
                        />,
                        )}
                    </Form.Item>
                    <Form.Item label="Content">
                        {getFieldDecorator('content', {
                        rules: [
                            {
                            required: true,
                            message: 'please enter content',
                            },
                        ],
                        })(<Input.TextArea rows={4} placeholder="please enter content" />)}
                    </Form.Item>
                    <Form.Item>
                            <Button htmlType="submit" style={{ marginRight: 35 }} type="primary">
                                保存
                            </Button>
                            <Button onClick={this.onReset} style={{ marginRight: 35 }}>
                                重置
                            </Button>
                            <Button onClick={this.onClose} style={{ color: '#ff0000' }}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
            );
        }
}

const CreateTodoDrawer = Form.create()(CreateTodoDrawerForm);

export default CreateTodoDrawer;